package org.vaishnav.safarsetu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class SafarsetuApplication {

    public static void main(String[] args) {
        SpringApplication.run(SafarsetuApplication.class, args);
    }

}
