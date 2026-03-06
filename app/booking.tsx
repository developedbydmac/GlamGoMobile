import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/DesignSystem';

export default function BookingScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate next 7 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        id: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: date,
      });
    }
    return dates;
  };

  const availableTimes = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
  ];

  const dates = generateDates();

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Pick a time first', 'Please select both a date and time for your appointment');
      return;
    }

    const dateInfo = dates.find(d => d.id === selectedDate);
    Alert.alert(
      'Confirm your booking?',
      `${dateInfo?.day}, ${dateInfo?.month} ${dateInfo?.date} at ${selectedTime}`,
      [
        { text: 'Back', style: 'cancel' },
        {
          text: 'Book It!',
          onPress: () => {
            // TODO: Create order via orderService
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.neutral.darkGrey} />
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>When works for you?</Text>
          <Text style={styles.headerSubtitle}>Pick your perfect time slot</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose a day</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateScroll}
          >
            {dates.map(date => (
              <TouchableOpacity
                key={date.id}
                style={[
                  styles.dateCard,
                  selectedDate === date.id && styles.dateCardSelected,
                ]}
                onPress={() => setSelectedDate(date.id)}
              >
                <Text
                  style={[
                    styles.dateDay,
                    selectedDate === date.id && styles.dateTextSelected,
                  ]}
                >
                  {date.day}
                </Text>
                <Text
                  style={[
                    styles.dateNumber,
                    selectedDate === date.id && styles.dateTextSelected,
                  ]}
                >
                  {date.date}
                </Text>
                <Text
                  style={[
                    styles.dateMonth,
                    selectedDate === date.id && styles.dateTextSelected,
                  ]}
                >
                  {date.month}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Time Selection */}
        {selectedDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pick a time</Text>
            <View style={styles.timeGrid}>
              {availableTimes.map(time => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeCard,
                    selectedTime === time && styles.timeCardSelected,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      styles.timeText,
                      selectedTime === time && styles.timeTextSelected,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Booking Summary */}
        {selectedDate && selectedTime && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Ionicons name="calendar-outline" size={24} color={Colors.primary.royalPurple} />
              <Text style={styles.summaryTitle}>Your appointment</Text>
            </View>
            <Text style={styles.summaryDate}>
              {dates.find(d => d.id === selectedDate)?.fullDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
            <Text style={styles.summaryTime}>{selectedTime}</Text>
            <Text style={styles.summaryNote}>
              💡 You'll get a confirmation text right after booking
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Confirm Button */}
      {selectedDate && selectedTime && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lightGrey,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkGrey,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginTop: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.md,
  },
  dateScroll: {
    gap: Spacing.md,
  },
  dateCard: {
    backgroundColor: Colors.neutral.softWhite,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    minWidth: 70,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateCardSelected: {
    backgroundColor: Colors.primary.royalPurple,
    borderColor: Colors.primary.royalPurple,
  },
  dateDay: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    marginBottom: Spacing.xs,
  },
  dateNumber: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.xs,
  },
  dateMonth: {
    fontSize: Typography.fontSize.xs,
    color: Colors.neutral.mediumGrey,
  },
  dateTextSelected: {
    color: Colors.neutral.white,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  timeCard: {
    backgroundColor: Colors.neutral.softWhite,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeCardSelected: {
    backgroundColor: Colors.primary.royalPurple,
    borderColor: Colors.primary.royalPurple,
  },
  timeText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkGrey,
  },
  timeTextSelected: {
    color: Colors.neutral.white,
  },
  summaryCard: {
    backgroundColor: '#F3E8FF',
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  summaryTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.royalPurple,
  },
  summaryDate: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold as any,
    color: Colors.neutral.darkGrey,
    marginBottom: Spacing.xs,
  },
  summaryTime: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold as any,
    color: Colors.primary.royalPurple,
    marginBottom: Spacing.md,
  },
  summaryNote: {
    fontSize: Typography.fontSize.sm,
    color: Colors.neutral.mediumGrey,
    lineHeight: 20,
  },
  footer: {
    padding: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.lightGrey,
    backgroundColor: Colors.neutral.white,
  },
  confirmButton: {
    backgroundColor: Colors.primary.royalPurple,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  confirmButtonText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold as any,
  },
});
