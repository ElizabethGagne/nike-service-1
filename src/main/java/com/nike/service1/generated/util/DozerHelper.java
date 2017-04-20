package com.nike.service1.generated.util;

import org.dozer.Mapper;

import java.util.ArrayList;
import java.util.List;

public class DozerHelper {

    public static <T, U> List<U> map(final Mapper mapper, final List<T> source, final Class<U> destType) {

        final List<U> dest = new ArrayList<>();

        for (T element : source) {
            dest.add(mapper.map(element, destType));
        }

        return dest;
    }
}
