using cAlgo.API;

namespace RichillCapital.Strategies.CTrader;

public sealed partial class CTraderRobot
{
    protected override double GetFitness(GetFitnessArgs args)
    {
        var netProfitToDrawdownRatio = args.NetProfit / Math.Abs(args.MaxEquityDrawdown);
        return netProfitToDrawdownRatio / 3 * args.NetProfit;
    }
}