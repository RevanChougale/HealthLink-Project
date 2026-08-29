package com.doctor_booking.Repository;

import com.doctor_booking.Entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    boolean existsByTimeSlotIdAndStatus(
            Long timeSlotId,
            String status
    );
}
