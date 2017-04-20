package helpers

import io.gatling.core.Predef._
import io.gatling.core.structure.ScenarioBuilder

/**
  * @author generated
  */
object TestHelper {

  val runScenario  = (sc:ScenarioBuilder) => sc.inject(atOnceUsers(1))

}
