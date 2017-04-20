package com.nike.service1.generated;

import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Base class with mapping aware code.
 */
public abstract class AbstractMappingAware {

  @Autowired
  @SuppressWarnings("unused")
  protected Mapper mapper;

  protected <TSource,TTarget> TTarget map(TSource source,Class<TTarget> targetClass)  { //NOSONAR
    return mapper.map(source,targetClass);
  }

  protected <TSource,TTarget> TTarget map(TSource source,TTarget target) { //NOSONAR
    mapper.map(source,target);
    return target;
  }

}
