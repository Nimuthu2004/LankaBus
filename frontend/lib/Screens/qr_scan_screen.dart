import 'package:flutter/material.dart';
import 'splash_screen.dart';

class QRScanScreen extends StatelessWidget {
  const QRScanScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: gradientBackground(
        child: Center(
          child: Container(
            height: 220,
            width: 220,
            decoration: BoxDecoration(
              color: Colors.white70,
              borderRadius: BorderRadius.circular(20),
            ),
            child: const Icon(Icons.qr_code_scanner, size: 120),
          ),
        ),
      ),
    );
  }
}
