import 'package:flutter/material.dart';

class HistoryScreen extends StatelessWidget {
  const HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Sample Trip Data
    final List<Map<String, String>> tripHistory = [
      {
        "route": "Colombo → Galle",
        "seat": "12",
        "fare": "Rs. 350",
        "date": "05 Mar 2026",
      },
      {
        "route": "Colombo → Kandy",
        "seat": "05",
        "fare": "Rs. 280",
        "date": "03 Mar 2026",
      },
      {
        "route": "Negombo → Colombo",
        "seat": "09",
        "fare": "Rs. 150",
        "date": "01 Mar 2026",
      },
    ];

    return Scaffold(
      appBar: AppBar(
        title: const Text("Trip History"),
        backgroundColor: const Color(0xFF1E3C72),
      ),

      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF1E3C72), Color(0xFF2A5298)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),

        child: ListView.builder(
          padding: const EdgeInsets.all(16),
          itemCount: tripHistory.length,
          itemBuilder: (context, index) {
            final trip = tripHistory[index];

            return Container(
              margin: const EdgeInsets.only(bottom: 16),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.95),
                borderRadius: BorderRadius.circular(15),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.15),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),

              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: const [
                      Icon(Icons.directions_bus, color: Color(0xFF1E3C72)),
                      SizedBox(width: 8),
                      Text(
                        "Trip Summary",
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),

                  const Divider(height: 20),

                  Row(
                    children: [
                      const Icon(Icons.route, size: 18),
                      const SizedBox(width: 8),
                      Text(
                        trip["route"]!,
                        style: const TextStyle(fontSize: 16),
                      ),
                    ],
                  ),

                  const SizedBox(height: 8),

                  Row(
                    children: [
                      const Icon(Icons.event_seat, size: 18),
                      const SizedBox(width: 8),
                      Text(
                        "Seat: ${trip["seat"]}",
                        style: const TextStyle(fontSize: 15),
                      ),
                    ],
                  ),

                  const SizedBox(height: 8),

                  Row(
                    children: [
                      const Icon(Icons.attach_money, size: 18),
                      const SizedBox(width: 8),
                      Text(
                        "Fare: ${trip["fare"]}",
                        style: const TextStyle(fontSize: 15),
                      ),
                    ],
                  ),

                  const SizedBox(height: 8),

                  Row(
                    children: [
                      const Icon(Icons.calendar_today, size: 18),
                      const SizedBox(width: 8),
                      Text(trip["date"]!, style: const TextStyle(fontSize: 15)),
                    ],
                  ),
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
