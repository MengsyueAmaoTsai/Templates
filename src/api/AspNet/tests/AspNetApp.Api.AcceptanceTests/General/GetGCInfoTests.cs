using System.Net;
using System.Net.Http.Json;

using AspNetApp.Api.Contracts.General;

using FluentAssertions;

namespace AspNetApp.Api.AcceptanceTests.General;

public sealed class GetGCInfoTests(
    EndToEndTestWebApplicationFactory factory) :
    AcceptanceTest(factory)
{
    [Fact]
    public async Task Should_ReturnGCInfo()
    {
        var response = await Client.GetAsync("/api/v1/gc-info");

        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var gcInfo = await response.Content.ReadFromJsonAsync<GCInfoResponse>();

        gcInfo.Should().NotBeNull();
        gcInfo?.MachineName.Should().NotBeNullOrEmpty();
    }
}