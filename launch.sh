#!/bin/bash

# Wedding Love Story Website Launcher
echo "💕 Starting Wedding Love Story Website..."
echo ""
echo "📁 Project Location: $(pwd)"
echo "🌐 Website will be available at: http://localhost:8000"
echo ""
echo "✨ Features included:"
echo "   • Interactive love story timeline"
echo "   • Beautiful photo gallery"
echo "   • Smooth animations and effects"
echo "   • Mobile-responsive design"
echo "   • Romantic floating hearts"
echo ""
echo "📸 Next steps:"
echo "   1. Replace placeholder images in images/ folder with real photos"
echo "   2. Customize names and details in index.html"
echo "   3. Update wedding date and locations"
echo ""
echo "🎉 Press Ctrl+C to stop the server"
echo ""

# Start a simple HTTP server
python3 -m http.server 8000
