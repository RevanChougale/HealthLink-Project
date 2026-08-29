package com.doctor_booking.Repository;

import com.doctor_booking.Entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TimeSlotRepository extends JpaRepository <TimeSlot,Long > {
    List<TimeSlot> findByDoctorIdAndDateAndAvailableTrue(
            Long doctorId,
            LocalDate date
    );
}
