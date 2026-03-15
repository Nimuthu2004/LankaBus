import 'package:flutter/material.dart';
import 'ticket_screen.dart';
import 'route_screen.dart';
import 'wallet_screen.dart';
import 'history_screen.dart';
import 'settings_screen.dart';
import 'profile_screen.dart';
import 'chatbot_screen.dart';

class UserHomeScreen extends StatelessWidget {
  const UserHomeScreen({super.key});

   @override
  Widget build(BuildContext context) {
    return Scaffold(

      /// BODY
      body: Stack(
        children: [

          /// Background Image
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage("assets/images/bus_bg.jpg"),
                fit: BoxFit.cover,
              ),
            ),
          ),

          /// Dark Overlay
          Container(
            color: Colors.black.withOpacity(0.5),
          ),

          SafeArea(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [

                  /// Greeting Section
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [

                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [

                          Text(
                            "Good Morning 👋",
                            style: TextStyle(
                              fontSize: 18,
                              color: Colors.white70,
                            ),
                          ),

                          SizedBox(height: 5),

                          Text(
                            "John",
                            style: TextStyle(
                              fontSize: 28,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                        ],
                      ),

                      CircleAvatar(
                        radius: 28,
                        backgroundImage:
                            AssetImage("assets/images/profile.jpg"),
                      ),
                    ],
                  ),

                  const SizedBox(height: 30),

                  /// Wallet Card
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(25),
                      border: Border.all(color: Colors.white30),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [

                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [

                            Text(
                              "Wallet Balance",
                              style: TextStyle(
                                color: Colors.white70,
                                fontSize: 16,
                              ),
                            ),

                            SizedBox(height: 5),

                            Text(
                              "Rs 850.00",
                              style: TextStyle(
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                            ),
                          ],
                        ),

                        Icon(
                          Icons.account_balance_wallet,
                          color: Colors.white,
                          size: 40,
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 30),

                  /// Quick Actions Title
                  const Text(
                    "Quick Actions",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),

                  const SizedBox(height: 20),

                  /// Menu Grid
                  Expanded(
                    child: GridView.count(
                      crossAxisCount: 2,
                      crossAxisSpacing: 15,
                      mainAxisSpacing: 15,
                      children: [

                        _buildMenuCard(
                          context,
                          "Bus Tickets",
                          Icons.directions_bus,
                          const TicketScreen(),
                        ),

                        _buildMenuCard(
                          context,
                          "Route",
                          Icons.alt_route,
                          const RouteScreen(),
                        ),

                        _buildMenuCard(
                          context,
                          "Wallet",
                          Icons.account_balance_wallet,
                          const WalletScreen(),
                        ),

                        _buildMenuCard(
                          context,
                          "History",
                          Icons.receipt_long,
                          const HistoryScreen(),
                        ),

                      ],
                    ),
                  ),

                ],
              ),
            ),
          ),
        ],
      ),