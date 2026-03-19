import 'package:flutter/material.dart';

class SeatUpdateScreen extends StatefulWidget {
  const SeatUpdateScreen({super.key});

  @override
  State<SeatUpdateScreen> createState() => _SeatUpdateScreenState();
}

class _SeatUpdateScreenState extends State<SeatUpdateScreen> {
  List<bool> seats = List.generate(20, (index) => false);

  Widget buildSeat(int index) {
    return GestureDetector(
      onTap: () {
        setState(() {
          seats[index] = !seats[index];
        });
      },
      child: Container(
        height: 55,
        width: 55,
        decoration: BoxDecoration(
          color: seats[index] ? Colors.red : Colors.green,
          borderRadius: BorderRadius.circular(10),
        ),
        child: Center(
          child: Text(
            "S${index + 1}",
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }

  Widget seatRow(int a, int b, int c, int d) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          buildSeat(a),
          const SizedBox(width: 10),
          buildSeat(b),

          const SizedBox(width: 35), // aisle gap

          buildSeat(c),
          const SizedBox(width: 10),
          buildSeat(d),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Seat Update"),
        backgroundColor: Colors.blueGrey[900],
        centerTitle: true,
      ),

      body: Column(
        children: [
          const SizedBox(height: 20),

          const Text(
            "Bus Seat Layout",
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
          ),

          const SizedBox(height: 20),

          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                seatRow(0, 1, 2, 3),
                seatRow(4, 5, 6, 7),
                seatRow(8, 9, 10, 11),
                seatRow(12, 13, 14, 15),
                seatRow(16, 17, 18, 19),
              ],
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(16),
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blueGrey[900],
                minimumSize: const Size(double.infinity, 50),
              ),
              onPressed: () {
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(const SnackBar(content: Text("Seats Updated")));
              },
              child: const Text("Update Seats"),
            ),
          ),
        ],
      ),
    );
  }
}
