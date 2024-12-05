using cAlgo.API;

namespace CTraderRobot;

public sealed partial class CTraderRobot
{
    [Parameter("Label", DefaultValue = "CTraderRobot")]
    public string Label { get; init; } = string.Empty;

    [Parameter("Order size", DefaultValue = 300_000, MinValue = 100)]
    public int OrderSize { get; init; }

    [Parameter("Channel length", DefaultValue = 55, MinValue = 5)]
    public int ChannelLength { get; init; }

    [Parameter("ATR length", DefaultValue = 14, MinValue = 5)]
    public int AtrLength { get; init; }

    [Parameter("Stop loss ATR multiplier", DefaultValue = 2.0, MinValue = 0.1)]
    public double StopLossAtrMultiplier { get; init; }

    [Parameter("Profit target ATR multiplier", DefaultValue = 2.0, MinValue = 0.1)]
    public double ProfitTargetAtrMultiplier { get; init; }
}
