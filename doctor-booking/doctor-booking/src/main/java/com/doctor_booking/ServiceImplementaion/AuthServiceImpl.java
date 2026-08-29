package com.doctor_booking.ServiceImplementaion;

import com.doctor_booking.Dto.AuthResponseDto;
import com.doctor_booking.Dto.LoginRequestDto;
import com.doctor_booking.Dto.RegisterRequestDto;
import com.doctor_booking.Entity.Patient;
import com.doctor_booking.Entity.Role;
import com.doctor_booking.Entity.User;
import com.doctor_booking.Repository.PatientRepository;
import com.doctor_booking.Repository.UserRepository;
import com.doctor_booking.Security.JwtService;
import com.doctor_booking.Service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(
            UserRepository userRepository,
            PatientRepository patientRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public void register(RegisterRequestDto request) {

        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalStateException(
                    "Email already registered");
        }

        // Create User
        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .password(
                        passwordEncoder.encode(
                                request.password()))
                .phone(request.phone())
                .role(request.role())
                .build();

        userRepository.save(user);

        // If the registered user is a PATIENT,
        // create a Patient profile as well.
        if (request.role() == Role.PATIENT) {

            Patient patient = Patient.builder()
                    .name(request.name())
                    .email(request.email())
                    .phone(request.phone())
                    .build();

            patientRepository.save(patient);
        }
    }

    @Override
    public AuthResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Invalid email or password"));

        if (!passwordEncoder.matches(
                request.password(),
                user.getPassword())) {

            throw new IllegalStateException(
                    "Invalid email or password");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name());

        Long patientId = null;

        // Get Patient ID only for PATIENT users
        if (user.getRole() == Role.PATIENT) {

            Patient patient = patientRepository
                    .findByEmail(user.getEmail())
                    .orElseThrow(() ->
                            new IllegalStateException(
                                    "Patient profile not found"));

            patientId = patient.getId();
        }

        return new AuthResponseDto(
                token,
                user.getEmail(),
                user.getRole().name(),
                patientId
        );
    }
}