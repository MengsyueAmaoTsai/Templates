using cAlgo.API;

namespace CTraderRobot;

[Robot(
    TimeZone = TimeZones.UTC,
    AccessRights = AccessRights.FullAccess)]
public sealed partial class CTraderRobot : Robot
{
    protected override void OnStart()
    {
        base.OnStart();
    }

    protected override void OnBarClosed()
    {
        base.OnBarClosed();
    }

    protected override void OnBar()
    {
        base.OnBar();
    }

    protected override void OnTick()
    {
        base.OnTick();
    }

    protected override void OnStop()
    {
        base.OnStop();
    }
}
