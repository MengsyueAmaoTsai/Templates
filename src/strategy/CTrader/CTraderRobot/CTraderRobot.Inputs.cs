using cAlgo.API;

namespace RichillCapital.Strategies.CTrader;

public sealed partial class CTraderRobot
{
    [Parameter("Label", DefaultValue = "CTraderRobot")]
    public string Label { get; init; } = string.Empty;

    [Parameter("Order size", DefaultValue = 30_000)]
    public int OrderSize { get; init; }

    [Parameter("Channel length", DefaultValue = 55)]
    public int ChannelLength { get; init; }

    [Parameter("ATR length", DefaultValue = 14)]
    public int AtrLength { get; init; }

    [Parameter("Stop loss ATR multiplier", DefaultValue = 2.0)]
    public double StopLossAtrMultiplier { get; init; }

    [Parameter("Profit target ATR multiplier", DefaultValue = 2.0)]
    public double ProfitTargetAtrMultiplier { get; init; }
}
