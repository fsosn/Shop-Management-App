package com.example.security.oauth.handlers;

import com.example.security.config.JwtService;
import com.example.security.oauth.model.CustomOAuth2User;
import com.example.user.model.User;
import com.example.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private final JwtService jwtService;

    @Value("${host.frontend}")
    private String host;
    @Value("${frontend.successful-oauth}")
    private String oauthSuccess;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        CustomOAuth2User oauthUser = (CustomOAuth2User) authentication.getPrincipal();
        userService.processOAuthPostLogin(oauthUser);

        User user = userService.getUserFromOAuthUser(oauthUser);
        String token = jwtService.generateToken(user);
        String email = user.getEmail();

        response.sendRedirect(host + oauthSuccess + "?token=" + token + "&email=" + email);
    }
}
