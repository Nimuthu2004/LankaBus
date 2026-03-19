import 'dart:ui';
import 'package:flutter/material.dart';

class WalletScreen extends StatefulWidget {
  const WalletScreen({super.key});

  @override
  State<WalletScreen> createState() => _WalletScreenState();
}

class _WalletScreenState extends State<WalletScreen> {

  double balance = 0;
  final TextEditingController amountController = TextEditingController();
  List<String> history = [];

  void addMoney(double amount) {
    setState(() {
      balance += amount;
      history.insert(0, "Recharge Rs. $amount");
    });
  }