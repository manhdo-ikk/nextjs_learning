"use client";

import { useEffect, useRef, useState } from "react";

type Stroke = [number, number][];
type InkData = Stroke[];

export default function DrawKanjiPaint() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokes, setStrokes] = useState<InkData>([]);
  const currentStroke = useRef<Stroke>([]);
  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const getOffset = (e: MouseEvent | TouchEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect();

      if ("touches" in e && e.touches.length > 0) {
        const touch = e.touches[0];

        return [
          Math.round(touch.clientX - rect.left),
          Math.round(touch.clientY - rect.top),
        ];
      } else if ("clientX" in e) {
        return [
          Math.round(e.clientX - rect.left),
          Math.round(e.clientY - rect.top),
        ];
      }

      return [0, 0];
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      setIsDrawing(true);
      currentStroke.current = [];
      const [x, y] = getOffset(e);

      currentStroke.current.push([x, y]);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const [x, y] = getOffset(e);
      const last = currentStroke.current[currentStroke.current.length - 1];

      currentStroke.current.push([x, y]);

      ctx.beginPath();
      ctx.moveTo(last[0], last[1]);
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const endDrawing = () => {
      if (currentStroke.current.length > 0) {
        setStrokes((prev) => [...prev, currentStroke.current]);
      }
      setIsDrawing(false);
    };

    // Mouse
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDrawing);

    // Touch
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", endDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", endDrawing);

      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", endDrawing);
    };
  }, [isDrawing]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setStrokes([]);
    currentStroke.current = [];
    setResult([]);
  };

  const recognize = async () => {
    // Include current stroke if still drawing
    const allStrokes = [...strokes];

    if (currentStroke.current.length > 0) {
      allStrokes.push(currentStroke.current);
    }

    try {
      const response = await fetch(
        "https://inputtools.google.com/request?itc=ja-t-i0-handwrit&app=translate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            app_version: "0.4",
            api_level: "537.36",
            input_type: 0,
            options: {},
            requests: [
              {
                language: "ja",
                writing_guide: {
                  writing_area_width: 300,
                  writing_area_height: 300,
                },
                ink: strokes,
              },
            ],
          }),
        }
      );

      const json = await response.json();

      if (json[0] === "SUCCESS") {
        const suggestions: string[] = json[1][0][1];

        setResult(suggestions);
      } else {
        setResult(["Lỗi nhận diện"]);
      }
    } catch (error) {
      console.error("Recognition error:", error);
      setResult(["Đã xảy ra lỗi khi gửi yêu cầu."]);
    }
  };

  return (
    <div>
      <h2>🖌️ Vẽ chữ Kanji</h2>
      <canvas
        ref={canvasRef}
        height={300}
        style={{
          border: "1px solid #ccc",
          touchAction: "none",
          backgroundColor: "#fdf6e3",
        }}
        width={300}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={clearCanvas}>🧹 Xóa</button>
        <button style={{ marginLeft: "10px" }} onClick={recognize}>
          🔍 Nhận diện
        </button>
      </div>
      <div style={{ marginTop: "10px", fontSize: "20px" }}>
        👉 Kết quả: {result.join(" , ")}
      </div>
    </div>
  );
}
