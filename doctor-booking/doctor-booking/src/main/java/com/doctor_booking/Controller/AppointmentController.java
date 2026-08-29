package com.doctor_booking.Controller;

import com.doctor_booking.Dto.AppointmentRequestDto;
import com.doctor_booking.Dto.AppointmentResponseDto;
import com.doctor_booking.Service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public AppointmentResponseDto bookAppointment(
            @Valid @RequestBody AppointmentRequestDto request) {

        return appointmentService.bookAppointment(request);
    }

    @GetMapping("/{id}")
    public AppointmentResponseDto getAppointment(
            @PathVariable Long id) {

        return appointmentService.getAppointmentById(id);
    }

    @GetMapping("/patient/{patientId}")
    public List<AppointmentResponseDto> getPatientAppointments(
            @PathVariable Long patientId) {

        return appointmentService
                .getPatientAppointments(patientId);
    }

    @GetMapping("/doctor/{doctorId}")
    public List<AppointmentResponseDto> getDoctorAppointments(
            @PathVariable Long doctorId) {

        return appointmentService
                .getDoctorAppointments(doctorId);
    }

    @PutMapping("/{id}/cancel")
    public AppointmentResponseDto cancelAppointment(
            @PathVariable Long id) {

        return appointmentService.cancelAppointment(id);
    }
}
