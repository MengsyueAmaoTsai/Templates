using System.Text;
using System.Text.Json;
using cAlgo.API;
using cAlgo.API.Indicators;
using HttpMethod = cAlgo.API.HttpMethod;

namespace RichillCapital.Strategies.CTrader;

[Robot(
    DefaultSymbolName = "NAS100",
    DefaultTimeFrame = "M3",
    TimeZone = TimeZones.UTC,
    AccessRights = AccessRights.FullAccess,
    AddIndicators = true)]
public sealed partial class CTraderRobot : Robot
{
    private readonly TradingContext _context = new();
    private DonchianChannel? _donchianChannel;
    private AverageTrueRange? _atr;

    protected override void OnStart()
    {
        _donchianChannel = Indicators.DonchianChannel(Bars, ChannelLength);
        _atr = Indicators.AverageTrueRange(Bars, AtrLength, MovingAverageType.Simple);
    }

    protected override void OnBar()
    {
    }

    protected override void OnBarClosed()
    {
        var position = Positions.Find(
            label: Label,
            symbolName: Symbol.Name,
            tradeType: TradeType.Buy);

        var close = Bars.ClosePrices;
        var high = Bars.HighPrices;
        var upperBand = _donchianChannel!.Top;
        var lowerBand = _donchianChannel.Bottom;
        var atr = _atr!.Result;

        if (position is null)
        {
            _context.StopLossPrice = 0;
            _context.ProfitTargetPrice = 0;
            _context.MaxProfitPoints = 0;

            var crossOver = close.LastValue >= upperBand.LastValue && close.Last(1) < upperBand.Last(1);

            if (crossOver)
            {
                var orderQuantity = Symbol.NormalizeVolumeInUnits(OrderSize / close.LastValue);

                var result = ExecuteMarketOrder(
                    tradeType: TradeType.Buy,
                    symbolName: Symbol.Name,
                    volume: orderQuantity,
                    label: Label);

                if (result.IsSuccessful)
                {
                    _context.StopLossPrice = close.LastValue - atr.LastValue * StopLossAtrMultiplier;
                    _context.ProfitTargetPrice = close.LastValue + atr.LastValue * ProfitTargetAtrMultiplier;
                }
            }
        }
        else
        {
            if (high.LastValue > position.EntryPrice + _context.MaxProfitPoints)
            {
                _context.MaxProfitPoints = high.LastValue - position.EntryPrice;
            }

            var crossUnder = close.LastValue <= lowerBand.LastValue && close.Last(1) > lowerBand.Last(1);
            var crossStopLoss = close.LastValue <= _context.StopLossPrice && close.Last(1) > _context.StopLossPrice;

            var trailingPrice = position.EntryPrice + _context.MaxProfitPoints * 0.8;
            var crossTrailingStop = close.LastValue <= trailingPrice &&
                close.Last(1) > trailingPrice;

            if (crossUnder)
            {
                ClosePosition(position);
            }
            else if (crossStopLoss)
            {
                ClosePosition(position);
            }
            else if (position.EntryPrice + _context.MaxProfitPoints >= _context.ProfitTargetPrice &&
                crossTrailingStop)
            {
                ClosePosition(position);
            }
        }
    }

    protected override void OnTick()
    {
        var uri = new Uri("https://localhost:10000/api/v1/signal-source-snapshots");

        var position = Positions.Find(
            label: Label,
            symbolName: Symbol.Name,
            tradeType: TradeType.Buy);

        var httpRequest = new HttpRequest(uri)
        {
            Method = HttpMethod.Post,
            Body = JsonSerializer.Serialize(new
            {
                // Heartbeat 
                Server.Time,
                SignalSourceId = "CTraderRobot",
                Instrument = new
                {
                    Symbol = Symbol.Name,
                    Symbol.Description,
                    TimeFrame = TimeFrame.ShortName,
                },
                Account = new
                {
                    Account.AccountType,

                    // Balance
                    Account.UserId,
                    Account.UserNickName,
                    Account.Asset,
                    Account.IsLive,
                    Account.Number,
                    Account.BrokerName,
                    Account.PreciseLeverage,
                    Account.Credit,
                    Account.TotalMarginCalculationType,

                    Account.Balance,
                    Account.Equity,
                    Account.Margin,
                    Account.FreeMargin,
                    Account.MarginLevel,
                    Account.StopOutLevel,
                    Account.UnrealizedGrossProfit,
                    Account.UnrealizedNetProfit,
                },
                Position = position is null ?
                    null :
                    new
                    {
                        Id = position.Id,
                        Side = position.TradeType == TradeType.Buy ? "Long" : "Short",
                        Quantity = position.Quantity,
                        AveragePrice = position.EntryPrice,
                        EntryTime = position.EntryTime,
                        Commission = position.Commissions,
                        Swap = position.Swap,
                    },
            }),
        };

        var httpResponse = Http.Send(httpRequest);
        Print("Response status code: {0}", httpResponse.StatusCode);
    }
}

internal sealed class TradingContext
{
    public double StopLossPrice { get; set; }
    public double ProfitTargetPrice { get; set; }
    public double MaxProfitPoints { get; set; }
}