package org.vaishnav.safarsetu.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.client.OAuth2ClientAutoConfiguration;
import org.springframework.boot.autoconfigure.security.oauth2.client.servlet.OAuth2ClientWebSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.vaishnav.safarsetu.config.TestSecurityConfig;
import org.vaishnav.safarsetu.domain.UserRole;
import org.vaishnav.safarsetu.exception.UserException;
import org.vaishnav.safarsetu.payload.dto.UserDto;
import org.vaishnav.safarsetu.payload.request.AuthLoginRequest;
import org.vaishnav.safarsetu.payload.response.AuthResponse;
import org.vaishnav.safarsetu.service.AuthService;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@WebMvcTest(controllers = AuthController.class)
@ActiveProfiles("test")
@Import(TestSecurityConfig.class)
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AuthService authService;

    @Autowired
    private ObjectMapper objectMapper;

    // Sample Data
    private UserDto validUserDto() {
        UserDto userDto = new UserDto();
        userDto.setEmail("vaishnavtest@safarsetu.com");
        userDto.setPassword("vaishnavtest");
        userDto.setFullName("Vaishnav Test");
        userDto.setPhone("9876543210");
        return userDto;
    }

    private AuthLoginRequest validLoginRequest() {
        AuthLoginRequest authLoginRequest = new AuthLoginRequest();
        authLoginRequest.setEmail("vaishnavtest@safarsetu.com");
        authLoginRequest.setPassword("vaishnavtest");
        return authLoginRequest;
    }

    private AuthResponse validAuthResponse() {
        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt("eyJhbGciOiJIUzI1NiJ9.mocktoken");
        authResponse.setMessage("Login Successfully");
        authResponse.setTitle("Welcome back ");
        UserDto userDto = validUserDto();
        userDto.setRole(UserRole.ROLE_USER);
        userDto.setId(21L);
        userDto.setLastLogin(LocalDateTime.now());
        authResponse.setUserDto(userDto);
        return authResponse;
    }

    // Register Test
    @Test
    void registerUser_ShouldReturn200_WhenValidRequest() throws Exception {
        when(authService.register(any(UserDto.class)))
                .thenReturn(validAuthResponse());

        mockMvc.perform(
                MockMvcRequestBuilders.post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(validUserDto()))
        )
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.jwt").isNotEmpty())
                .andExpect(MockMvcResultMatchers.jsonPath("$.message").value("Login Successfully"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.userDto.role").value("ROLE_USER"));
    }

    @Test
    void registerUser_ShouldReturn400_WhenEmailIsBlank() throws Exception {
        UserDto invalidUserDto = validUserDto();
        invalidUserDto.setEmail("");

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(invalidUserDto))
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void registerUser_ShouldReturn400_WhenPasswordIsBlank() throws Exception {
        UserDto invalidUserDto = validUserDto();
        invalidUserDto.setPassword("");

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(invalidUserDto))
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void registerUser_ShouldReturn400_WhenEmailAlreadyExists() throws Exception {
        when(authService.register(any(UserDto.class)))
                .thenThrow(new UserException("User already exists with email"));

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(validUserDto()))
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void registerUser_ShouldReturn400_WhenRequestBodyIsMissing() throws Exception {

        mockMvc.perform(
                        MockMvcRequestBuilders.post("/auth/register")
                                .contentType(MediaType.APPLICATION_JSON)
                )
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

}
