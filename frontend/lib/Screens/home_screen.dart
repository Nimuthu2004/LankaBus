import 'package:flutter/material.dart';
import 'qr_scan_screen.dart';
import 'splash_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: gradientBackground(
        child: Column(
          children: [
            const SizedBox(height: 60),
            const Text("Hi, Binuka",
                style: TextStyle(fontSize: 24, color: Colors.white)),
            const SizedBox(height: 30),
            ElevatedButton(onPressed: () {}, child: const Text("Tickets")),
            ElevatedButton(onPressed: () {}, child: const Text("Route")),
            ElevatedButton(onPressed: () {}, child: const Text("Wallet")),
            ElevatedButton(onPressed: () {}, child: const Text("History")),
            const Spacer(),
            IconButton(
              icon:
                  const Icon(Icons.qr_code_scanner, size: 40, color: Colors.white),
              onPressed: () {
                Navigator.push(context,
                    MaterialPageRoute(builder: (_) => const QRScanScreen()));
              },
            ),
            const SizedBox(height: 20)
          ],
        ),
      ),
    );
  }
}
