using cAlgo.API;
using cAlgo.API.Indicators;

namespace CTraderRobot;

[Robot(
    DefaultSymbolName = "NAS100",
    DefaultTimeFrame = "M15",
    TimeZone = TimeZones.UTC,
    AccessRights = AccessRights.FullAccess)]
public sealed partial class CTraderRobot : Robot
{
    private readonly TradingContext _context = new();
    private DonchianChannel _donchianChannel;
    private AverageTrueRange _atr;

    protected override void OnStart()
    {
        _donchianChannel = Indicators.DonchianChannel(Bars, ChannelLength);
        _atr = Indicators.AverageTrueRange(Bars, AtrLength, MovingAverageType.Simple);
    }

    protected override void OnBar() { }

    protected override void OnBarClosed()
    {
        var position = Positions.Find(
            label: Label,
            symbolName: Symbol.Name,
            tradeType: TradeType.Buy);

        var close = Bars.ClosePrices;
        var high = Bars.HighPrices;
        var upperBand = _donchianChannel.Top;
        var lowerBand = _donchianChannel.Bottom;
        var atr = _atr.Result;

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
                    Print("Set stop loss price: {0}", _context.StopLossPrice);
                    Print("Set profit target price: {0}", _context.ProfitTargetPrice);
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
                Print("Cross under. Close position.");
                ClosePosition(position);
            }
            else if (crossStopLoss)
            {
                Print("Stop loss activated. Stop loss price: {0}", _context.StopLossPrice);
                ClosePosition(position);
            }
            else if (position.EntryPrice + _context.MaxProfitPoints >= _context.ProfitTargetPrice &&
                crossTrailingStop)
            {
                Print("Trailing stop activated. Trailing stop price: {0}", trailingPrice);
                ClosePosition(position);
            }
        }
    }

    protected override void OnTick() { }

    protected override void OnStop() { }
}

internal sealed class TradingContext
{
    public double StopLossPrice { get; set; }
    public double ProfitTargetPrice { get; set; }
    public double MaxProfitPoints { get; set; }
}