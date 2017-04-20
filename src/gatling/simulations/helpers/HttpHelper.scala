package helpers

import io.gatling.core.Predef._
import io.gatling.http.Predef._

/**
  * @author generated
  */
object HttpHelper {

  val baseUrl = Option(System.getProperty("gatling.server.url")) getOrElse """http://localhost:7777"""

  val httpConfig = () => http
    .baseURL(baseUrl)
    .inferHtmlResources()
    .acceptHeader("*/*")
    .acceptEncodingHeader("gzip, deflate")
    .acceptLanguageHeader("fr,fr-fr;q=0.8,en-us;q=0.5,en;q=0.3")
    .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:33.0) Gecko/20100101 Firefox/33.0")

  var httpHeaders = Map(
    "Accept" -> """application/json"""
  )

  var httpAuthenticatedHeaders = Map (
    "Accept" -> """application/json"""
  )

  val restPost = (description:String,url:String,body:String) =>
    http(description)
      .post(url)
      .headers(HttpHelper.httpAuthenticatedHeaders)
      .body(StringBody(body)).asJSON

  val restPut = (description:String,url:String,body:String) =>
    http(description)
      .put(url)
      .headers(HttpHelper.httpAuthenticatedHeaders)
      .body(StringBody(body)).asJSON

  val restGet = (description:String, url:String) =>
    http(description)
      .get(url)
      .headers(HttpHelper.httpAuthenticatedHeaders)

  val restDelete = (description:String, url:String) =>
    http(description)
      .delete(url)
      .headers(HttpHelper.httpAuthenticatedHeaders)
}
