package org.vaishnav.safarsetu.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConstants {
    public static String JWT_SECRET;
    public static String FRONTEND_URL_USER;
    public static String FRONTEND_URL_ADMIN;
    public static String ADMIN_EMAIL;
    public static String ADMIN_PASSWORD;

    public static final int MAX_ACTIVE_RESERVATION = 3;
    public static final double FUEL_AVERAGE_COST = 90.50;

    public static final String PASSWORD_RESET_MAIL_BODY = """
            The following link can be used to reset password of your SafarSetu Account.
            The link is valid till 5 minutes
            Please report if not requested by you.
            """;

    @Value("${client.jwt.secret}")
    public void setJwtSecret(String value) { JWT_SECRET = value; }

    @Value("${client.frontend.user.url}")
    public void setFrontendUrlUser(String value) { FRONTEND_URL_USER = value; }

    @Value("${client.frontend.admin.url}")
    public void setFrontendUrlAdmin(String value) { FRONTEND_URL_ADMIN = value; }

    @Value("${client.admin.email}")
    public void setAdminEmail(String value) { ADMIN_EMAIL = value; }

    @Value("${client.admin.password}")
    public void setAdminPassword(String value) { ADMIN_PASSWORD = value; }
}
