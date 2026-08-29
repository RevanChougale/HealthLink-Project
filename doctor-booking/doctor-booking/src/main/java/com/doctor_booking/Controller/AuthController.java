package com.doctor_booking.Controller;

import com.doctor_booking.Dto.AuthResponseDto;
import com.doctor_booking.Dto.LoginRequestDto;
import com.doctor_booking.Dto.RegisterRequestDto;
import com.doctor_booking.Service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public String register(
            @Valid @RequestBody RegisterRequestDto request) {

        authService.register(request);

        return "User registered successfully";
    }

    @PostMapping("/login")
    public AuthResponseDto login(
            @Valid @RequestBody LoginRequestDto request) {

        return authService.login(request);
    }

}
