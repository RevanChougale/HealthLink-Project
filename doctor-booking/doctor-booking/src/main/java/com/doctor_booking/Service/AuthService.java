package com.doctor_booking.Service;

import com.doctor_booking.Dto.AuthResponseDto;
import com.doctor_booking.Dto.LoginRequestDto;
import com.doctor_booking.Dto.RegisterRequestDto;

public interface AuthService {
    void register(RegisterRequestDto request);
    AuthResponseDto login(LoginRequestDto request);
}
