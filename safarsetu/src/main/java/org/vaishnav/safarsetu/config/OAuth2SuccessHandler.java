package org.vaishnav.safarsetu.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.vaishnav.safarsetu.domain.AuthProvider;
import org.vaishnav.safarsetu.domain.UserRole;
import org.vaishnav.safarsetu.models.User;
import org.vaishnav.safarsetu.repository.UserRepository;

import java.io.IOException;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication)
            throws IOException, ServletException {
        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

        OAuth2User oAuth2User = oauthToken.getPrincipal();

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");

        String authProvider = oauthToken.getAuthorizedClientRegistrationId();

        User user = userRepository.findByEmail(email).orElse(null);

        if(user == null) {
            // Creating new User
            user = new User();
            user.setEmail(email);
            user.setFullName(name);
            user.setRole(UserRole.ROLE_USER);
            user.setProfileImageUrl(picture);
            user.setAuthProvider(
                    authProvider.equals("google") ? AuthProvider.GOOGLE : AuthProvider.GITHUB
            );
            if(authProvider.equals("google")) {
                user.setGoogleId(oAuth2User.getAttribute("sub"));
            }
            else if(authProvider.equals("github")) {
                user.setGithubId(oAuth2User.getAttribute("id"));
            }
        }
        else {
            if (authProvider.equals("google")) {
                user.setGoogleId(oAuth2User.getAttribute("sub"));
                user.setAuthProvider(AuthProvider.GOOGLE);
            }

            if (authProvider.equals("github")) {
                user.setGithubId(String.valueOf(oAuth2User.getAttribute("id")));
                user.setAuthProvider(AuthProvider.GITHUB);
            }

            // Update profile image if missing
            if (user.getProfileImageUrl() == null) {
                user.setProfileImageUrl(picture);
            }
        }
        user.setLastLogin(LocalDateTime.now());

        user = userRepository.save(user);

        String token = jwtUtils.generateJwtTokenFromUser(user);

        response.sendRedirect(
                 AppConstants.FRONTEND_URL_USER + "/oauth-success?token=" + token
        );
    }
}
