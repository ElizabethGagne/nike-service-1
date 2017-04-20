package sim0000

import helpers._
import io.gatling.core.Predef._
import io.gatling.http.Predef._

/**
 * @author generated
 */
 class HealthSimulation extends Simulation {

    val healthTask =
      exec(HttpHelper.restGet("Get Health Endpoint","/health")
        .check(status.is(200),jsonPath("$.status").is("UP"))
      )


    val storyScenario = scenario("SIM-0000: Service Default Endpoints")
       .exec(healthTask)

     setUp (
       TestHelper.runScenario(storyScenario)
     )
     .protocols(HttpHelper.httpConfig())
 }
