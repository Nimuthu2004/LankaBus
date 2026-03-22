import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../widgets/custom_button.dart';
import '../widgets/custom_textfield.dart';

enum ResetStep { enterEmail, enterOTP, resetPassword }

class ForgotPasswordScreen extends StatefulWidget {
  const ForgotPasswordScreen({super.key});

  @override
  State<ForgotPasswordScreen> createState() => _ForgotPasswordScreenState();
}

class _ForgotPasswordScreenState extends State<ForgotPasswordScreen> {

    ResetStep currentStep = ResetStep.enterEmail;

    final TextEditingController emailController = TextEditingController();

    final List<TextEditingController> otpControllers =
        List.generate(4, (_) => TextEditingController());

    final List<FocusNode> otpFocusNodes =
        List.generate(4, (_) => FocusNode());
    
    final TextEditingController newPassController = TextEditingController();
    final TextEditingController confirmPassController = TextEditingController();

    bool showNewPassword = false;
    bool showConfirmPassword = false;

    int seconds = 60;
    bool isTimerRunning = false;
    
    @override
    void dispose() {
        emailController.dispose();

        for (var c in otpControllers) {
            c.dispose();
        }

        for (var f in otpFocusNodes) {
            f.dispose();
        }

        newPassController.dispose();
        confirmPassController.dispose();

        super.dispose();
    }
    
    /// ================= SEND OTP =================
    void sendOTP() {
        final input = emailController.text.trim();

        if (input.isEmpty) {
            showSnack("Please enter email or phone number");
            return;
        }

        setState(() {
            currentStep = ResetStep.enterOTP;
            startTimer();
        });

        showSnack("OTP sent to $input");
    }

    /// ================= VERIFY OTP =================
    void verifyOTP() {
        String otp = otpControllers.map((e) => e.text).join();

        if (otp.length != 4) {
            showSnack("Enter complete 4 digit OTP");
            return;
        }

        setState(() {
            currentStep = ResetStep.resetPassword;
        });
    }

    /// ================= TIMER =================
    void startTimer() async {
        if (isTimerRunning) return;

        isTimerRunning = true;
        seconds = 60;

        while (seconds > 0) {
            await Future.delayed(const Duration(seconds: 1));

            if (!mounted) return;

            setState(() => seconds--);
        }

        isTimerRunning = false;
    }

    void resendOTP() {
        startTimer();
        showSnack("OTP Resent");
    }
    
    /// ================= RESET PASSWORD =================
    void resetPassword() {

        final newPass = newPassController.text.trim();
        final confirmPass = confirmPassController.text.trim();

        if (newPass.isEmpty || confirmPass.isEmpty) {
            showSnack("Please fill all fields");
            return;
        }

        if (!isStrongPassword(newPass)) {
            showSnack("Password must contain uppercase, number & special character");
            return;
        }

        if (newPass != confirmPass) {
            showSnack("Passwords do not match");
            return;
        }

        showSnack("Password reset successful");

        Navigator.pop(context);
    }

    bool isStrongPassword(String password) {
        final regex = RegExp(r'^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$&*~]).{6,}$');
        return regex.hasMatch(password);
    }

    void showSnack(String message) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text(message)));
  }

  /// ================= OTP BOXES =================
  Widget buildOTPBoxes() {

    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: List.generate(4, (index) {

        return SizedBox(
          width: 60,
          child: TextField(
            controller: otpControllers[index],
            focusNode: otpFocusNodes[index],
            keyboardType: TextInputType.number,
            textAlign: TextAlign.center,
            maxLength: 1,

            inputFormatters: [
              FilteringTextInputFormatter.digitsOnly,
            ],

            style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold),

            decoration: InputDecoration(
              counterText: "",
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),

            onChanged: (value) {

              /// AUTO PASTE OTP
              if (value.length > 1) {

                for (int i = 0; i < 4; i++) {
                  if (i < value.length) {
                    otpControllers[i].text = value[i];
                  }
                }

                FocusScope.of(context).unfocus();
                return;
              }

              /// AUTO MOVE NEXT
              if (value.isNotEmpty && index < 3) {
                otpFocusNodes[index + 1].requestFocus();
              }

              /// MOVE BACK WHEN DELETE
              if (value.isEmpty && index > 0) {
                otpFocusNodes[index - 1].requestFocus();
              }
            },
          ),
        );
      }),
    );
  }

  /// ================= UI BUILDER =================
  Widget buildContent() {

    switch (currentStep) {

      case ResetStep.enterEmail:

        return Column(
          children: [

            const Text(
              "Forgot Password",
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 28,
                  fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 30),

            CustomTextField(
              controller: emailController,
              hint: "Enter your email or phone",
            ),

            const SizedBox(height: 20),

            CustomButton(
                text: "Send OTP",
                onPressed: sendOTP),
          ],
        );

      case ResetStep.enterOTP:

        return Column(
          children: [

            const Text(
              "Enter OTP",
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 28,
                  fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 30),

            buildOTPBoxes(),

            const SizedBox(height: 20),

            CustomButton(
                text: "Verify OTP",
                onPressed: verifyOTP),

            const SizedBox(height: 20),

            Text(
              seconds > 0
                  ? "Resend OTP in $seconds s"
                  : "Didn't receive OTP?",
              style: const TextStyle(color: Colors.white),
            ),

            if (seconds == 0)
              TextButton(
                onPressed: resendOTP,
                child: const Text(
                  "Resend OTP",
                  style: TextStyle(
                      color: Colors.white,
                      decoration: TextDecoration.underline),
                ),
              ),
          ],
        );

      case ResetStep.resetPassword:

        return Column(
          children: [

            const Text(
              "Reset Password",
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 28,
                  fontWeight: FontWeight.bold),
            ),

            const SizedBox(height: 30),

            /// NEW PASSWORD
            TextField(
              controller: newPassController,
              obscureText: !showNewPassword,
              decoration: InputDecoration(
                hintText: "New Password",
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12)),

                suffixIcon: IconButton(
                  icon: Icon(
                    showNewPassword
                        ? Icons.visibility
                        : Icons.visibility_off,
                  ),

                  onPressed: () {
                    setState(() {
                      showNewPassword = !showNewPassword;
                    });
                  },
                ),
              ),
            ),

            const SizedBox(height: 20),

            /// CONFIRM PASSWORD
            TextField(
              controller: confirmPassController,
              obscureText: !showConfirmPassword,

              decoration: InputDecoration(
                hintText: "Confirm Password",
                filled: true,
                fillColor: Colors.white,
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12)),

                suffixIcon: IconButton(
                  icon: Icon(
                    showConfirmPassword
                        ? Icons.visibility
                        : Icons.visibility_off,
                  ),

                  onPressed: () {
                    setState(() {
                      showConfirmPassword = !showConfirmPassword;
                    });
                  },
                ),
              ),
            ),

            const SizedBox(height: 20),

            const Text(
              "Password must contain:\n• 1 Uppercase\n• 1 Number\n• 1 Special Character",
              style: TextStyle(color: Colors.white70),
              textAlign: TextAlign.center,
            ),

            const SizedBox(height: 20),

            CustomButton(
              text: "Reset Password",
              onPressed: resetPassword,
            ),
          ],
        );
    }
  }

  /// ================= MAIN UI =================
  @override
  Widget build(BuildContext context) {

    return Scaffold(

      body: Container(

        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFF1E3C72), Color(0xFF2A5298)],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),

        child: SafeArea(

          child: Column(
            children: [

              /// BACK BUTTON
              Align(
                alignment: Alignment.topLeft,
                child: IconButton(
                  icon: const Icon(
                    Icons.arrow_back,
                    color: Colors.white,
                  ),
                  onPressed: () {
                    Navigator.pop(context);
                  },
                ),
              ),

              Expanded(
                child: Center(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.all(20),
                    child: buildContent(),
                  ),
                ),
              ),

            ],
          ),
        ),
      ),
    );
  }
}