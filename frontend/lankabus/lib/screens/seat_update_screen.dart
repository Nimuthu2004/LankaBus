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
}
