import 'package:flutter_test/flutter_test.dart';

import 'package:lanka_go/main.dart';

void main() {
  testWidgets('Splash screen renders', (WidgetTester tester) async {
    await tester.pumpWidget(const LankaGoApp());
    expect(find.text('Lanka Go'), findsOneWidget);
    expect(find.text('Your journey,\nJust a Tap Away'), findsOneWidget);
  });
}
