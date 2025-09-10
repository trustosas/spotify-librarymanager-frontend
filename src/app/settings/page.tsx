"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card";
import { Label } from "@/registry/new-york-v4/ui/label";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Slider } from "@/registry/new-york-v4/ui/slider";
import { Button } from "@/registry/new-york-v4/ui/button";
import { toast } from "sonner";

const KEY = "mla.rateLimitSeconds";

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function SettingsPage() {
  const [delay, setDelay] = useState<number>(0);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw != null) {
        const n = Number(raw);
        if (!Number.isNaN(n)) setDelay(clamp(n, 0, 120));
      }
    } catch {}
  }, []);

  const save = () => {
    try {
      const v = clamp(delay, 0, 120);
      window.localStorage.setItem(KEY, String(v));
      setDelay(v);
      toast.success("Saved", { description: `Rate limit delay set to ${v}s` });
    } catch {
      toast.error("Unable to save", { description: "Storage is unavailable" });
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-3 py-6 sm:px-6">
      <h1 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Rate limit delay</CardTitle>
          <CardDescription>Delay between API actions. Range: 0 to 120 seconds.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="delay">Delay (seconds)</Label>
            <div className="grid gap-3 sm:grid-cols-5 sm:items-center">
              <div className="sm:col-span-4 px-1">
                <Slider value={[delay]} min={0} max={120} step={1} onValueChange={(v) => setDelay(v[0] ?? 0)} />
              </div>
              <div className="sm:col-span-1">
                <Input
                  id="delay"
                  type="number"
                  min={0}
                  max={120}
                  value={delay}
                  onChange={(e) => setDelay(clamp(Number(e.target.value), 0, 120))}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={save} className="bg-brand text-black hover:bg-brand/90">Save</Button>
            <Button
              variant="outline"
              className="border-brand text-brand hover:bg-brand/10"
              onClick={() => setDelay(0)}
            >
              Reset to 0s
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
