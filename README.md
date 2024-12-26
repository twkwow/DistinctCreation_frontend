1. Run "npm install"
2. To run frontend, "npm run dev"
3. Go to http://localhost:3000 on browser

Tests done

Test 1: Upload single image (> 128x128px) on "Story 1 & Story 3"
Result: Single image uploaded to the "uploads" folder on backend, permenant & 2 thumbnail links generated ( 32px and 64px )

Test 2: Upload single image (<> 128x128px) on "Story 1 & Story 3"
Result: Single image uploaded to the "uploads" folder on backend, permenant & 1 thumbnail link generated ( its own size <128px )

Test 3: Upload single image on "Story 2.1"
Result: Single image uploaded to the "uploads" folder on backend, permenant link generated.

Test 4: Upload a ZIP File containing images on "Story 2.1"
Result: Extracts the ZIP folder, then the images uploaded to the "uploads" folder on backend, multiple permenant link generated.
