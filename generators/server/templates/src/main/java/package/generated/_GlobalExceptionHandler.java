package <%=packageName%>.generated;

import <%=packageName%>.generated.HttpErrorDto;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import lombok.extern.slf4j.Slf4j;

/**
 * @author generated
 */
@ControllerAdvice
@Slf4j
@SuppressWarnings("unused")
public class GlobalExceptionHandler {

  /**
   * Exception handler for IllegalArgumentException, IllegalStateException, MethodArgumentNotValidException and
   * @param exception The exception thrown
   * @return Returns NOT_ACCEPTABLE (406) status code
   */
  @ExceptionHandler({
    IllegalArgumentException.class,
    IllegalStateException.class,
    MethodArgumentNotValidException.class
  })
  public ResponseEntity<HttpErrorDto> handleInvalidArguments(Throwable exception) {
    log.error("Invalid arguments",exception);
    return buildErrorResponse(HttpStatus.NOT_ACCEPTABLE,exception);
  }

  /**
   * Exception handler for HttpMessageNotReadableException exception.
   * @param exception The exception thrown
   * @return Returns BAD_REQUEST (400) status code
   */
  @ExceptionHandler({
    HttpMessageNotReadableException.class
  })
  public ResponseEntity<HttpErrorDto> handleMessageNotReadable(Throwable exception) {
    log.error("Invalid http message",exception);
    return buildErrorResponse(HttpStatus.BAD_REQUEST,exception);
  }


  /**
   * Exception handler for all other exceptions.
   * @param exception The exception thrown
   * @return Returns INTERNAL_SERVER_ERROR (500) status code
   */
  @ExceptionHandler({ Throwable.class})
  public ResponseEntity<HttpErrorDto> handleDefaultError(Throwable exception) {
    log.error("Unhandled application  exception",exception);
    return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,exception);
  }


  private ResponseEntity<HttpErrorDto> buildErrorResponse(HttpStatus status,Throwable exception) {
    return ResponseEntity.status(status)
      .body(HttpErrorDto.builder().exception(exception.toString()).build());
  }


}
