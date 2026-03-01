package org.vaishnav.safarsetu.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.vaishnav.safarsetu.models.User;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class JwtUtils {
    SecretKey secretKey = Keys.hmacShaKeyFor(AppConstants.JWT_SECRET.getBytes());

    public String generateJwtToken(Authentication authentication) {
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String roles = populateAuthorities(authorities);
        
        return Jwts.builder()
                .issuedAt( new Date() )
                .expiration( new Date( new Date().getTime() + 86400000 ) )
                .claim("email", authentication.getName())
                .claim("authorities", roles)
                .signWith(secretKey)
                .compact();
    }

    public String generateJwtTokenFromUser(User user) {
        return Jwts.builder()
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .claim("email", user.getEmail())
                .claim("role", user.getRole().name())
                .claim("authProvider", user.getAuthProvider().name())
                .signWith(secretKey)
                .compact();
    }

    public String getEmailFromJwtToken(String token) {
        token = token.substring(7);
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token).getPayload();

        return claims.get("email").toString();
    }

    private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Set<String> roles = new HashSet<>();

        for ( GrantedAuthority authority : authorities ) {
            roles.add( authority.getAuthority() );
        }
        return String.join(",", roles);
    }

}
