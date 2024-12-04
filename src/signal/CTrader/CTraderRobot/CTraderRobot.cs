using cAlgo.API;

namespace CTraderRobot;

[Robot(TimeZone = TimeZones.UTC, AccessRights = AccessRights.FullAccess)]
public sealed partial class CTraderRobot : Robot
{
    protected override void OnStart() =>
        Print("Hello world!");
}
