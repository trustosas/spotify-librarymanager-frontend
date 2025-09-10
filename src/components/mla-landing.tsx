'use client';

'use client';

import { useEffect, useMemo, useState } from 'react';

import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Skeleton } from '@/registry/new-york-v4/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york-v4/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/registry/new-york-v4/ui/accordion';
import { Progress } from '@/registry/new-york-v4/ui/progress';
import SimulatorStepper from '@/components/mla-simulator';
import { Check, ChevronRight, Library, ListMusic, Lock, Music, Repeat2, Share2, Sparkles, Upload, X } from 'lucide-react';
import { toast } from 'sonner';

const demoPlaylists = [
  { name: 'Daily Mix Indie', tracks: 48 },
  { name: 'Focus Beats', tracks: 63 },
  { name: 'Chill Vibes', tracks: 37 },
  { name: 'Throwback 2000s', tracks: 92 }
];

function Hero() {
  return (
    <section className="mx-auto mt-6 max-w-7xl px-3 sm:mt-10 sm:px-6">
      <div className="grid items-center gap-8 sm:grid-cols-2">
        <div className="space-y-4 sm:space-y-6">
          <Badge className="bg-brand text-black hover:bg-brand/90">New • MVP</Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Manage and move your playlists between accounts
          </h1>
          <p className="text-pretty text-muted-foreground text-base sm:text-lg">
            Music Library Assistant keeps your music in sync. Transfer playlists to a new account, or mirror songs
            across multiple profiles in one click.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="bg-brand text-black hover:bg-brand/90" asChild>
              <a href="#demo">Get Started</a>
            </Button>
          </div>
          <ul className="text-muted-foreground/90 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <li className="inline-flex items-center gap-2"><Check className="text-brand size-4"/> Connect with OAuth in seconds</li>
            <li className="inline-flex items-center gap-2"><Check className="text-brand size-4"/> Sync songs between playlists</li>
            <li className="inline-flex items-center gap-2"><Check className="text-brand size-4"/> Transfer playlists between accounts</li>
            <li className="inline-flex items-center gap-2"><Check className="text-brand size-4"/> Preview changes before applying</li>
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex size-8 items-center justify-center rounded-md bg-brand text-black"><Music className="size-4"/></span>
                <span className="font-semibold">Your playlists</span>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {demoPlaylists.map((p) => (
                <div key={p.name} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-md bg-muted inline-flex items-center justify-center">
                        <ListMusic className="size-4"/>
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-tight">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.tracks} tracks</p>
                      </div>
                    </div>
                    <Button size="sm" className="bg-brand text-black hover:bg-brand/90">Sync</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="rounded-xl border p-5">
      <div className="mb-3 inline-flex size-9 items-center justify-center rounded-md bg-brand text-black"><Icon className="size-4"/></div>
      <h3 className="mb-1 text-base font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-3 py-10 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Sync & Transfer</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Feature icon={Repeat2} title="Synchronize songs in playlists" desc="Keep two playlists in lockstep by mirroring additions and removals across accounts." />
        <Feature icon={Share2} title="Transfer a playlist" desc="Copy a playlist to another account and preserve order where possible." />
      </div>
    </section>
  );
}

function Simulator() {
  const [tab, setTab] = useState<'sync' | 'transfer'>('sync');
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const [source, setSource] = useState('user-a');
  const [target, setTarget] = useState('user-b');
  const [result, setResult] = useState<string | null>(null);

  const canRun = useMemo(() => connected && !loading && source && target, [connected, loading, source, target]);

  return (
    <section id="demo" className="mx-auto max-w-7xl px-3 py-2 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><span className="inline-flex size-7 items-center justify-center rounded-md bg-brand text-black"><ListMusic className="size-4"/></span> Demo simulator</CardTitle>
          <CardDescription>Connect demo accounts, pick playlists, and run a simulated {tab}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Tabs value={tab} onValueChange={(v) => setTab(v as 'sync' | 'transfer')}>
            <TabsList>
              <TabsTrigger value="sync">Sync</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
            </TabsList>
            <TabsContent value="sync" className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="source">Source account</Label>
                  <Input id="source" value={source} onChange={(e) => setSource(e.target.value)} placeholder="account id" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">Target account</Label>
                  <Input id="target" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="account id" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sourcePl">Source playlist ID</Label>
                  <Input id="sourcePl" placeholder="playlist id" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetPl">Target playlist ID</Label>
                  <Input id="targetPl" placeholder="playlist id" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={() => { setConnected(true); toast('Demo accounts connected'); }}
                  variant={connected ? 'secondary' : 'default'}
                  className={connected ? '' : 'bg-brand text-black hover:bg-brand/90'}
                >
                  {connected ? 'Connected' : 'Connect demo accounts'}
                </Button>
                <Button
                  type="button"
                  disabled={!canRun}
                  onClick={() => {
                    setLoading(true); setResult(null);
                    window.setTimeout(() => {
                      setLoading(false);
                      setResult('Added 12 songs, removed 3 songs. No duplicates found.');
                      toast.success('Sync complete', { description: '12 added • 3 removed' });
                    }, 1200);
                  }}
                  className="bg-brand text-black hover:bg-brand/90 disabled:opacity-50">
                  Run sync
                </Button>
              </div>
              {loading ? (
                <div className="grid gap-2 sm:grid-cols-2">
                  <Skeleton className="h-16" />
                  <Skeleton className="h-16" />
                </div>
              ) : result ? (
                <div className="rounded-lg border p-4 text-sm">
                  <p className="mb-2 font-medium">Preview</p>
                  <ul className="grid gap-1">
                    <li className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400"><Check className="size-4"/> Added 12 songs</li>
                    <li className="inline-flex items-center gap-2 text-red-600 dark:text-red-400"><ChevronRight className="size-4 rotate-90"/> Removed 3 songs</li>
                  </ul>
                  <p className="mt-3 text-muted-foreground">{result}</p>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No run yet. Connect accounts to begin.</p>
              )}
            </TabsContent>
            <TabsContent value="transfer" className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="from">From account</Label>
                  <Input id="from" placeholder="old-account-id" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To account</Label>
                  <Input id="to" placeholder="new-account-id" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="playlist">Playlist ID</Label>
                <Input id="playlist" placeholder="playlist id" />
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-brand text-black hover:bg-brand/90">Select playlist</Button>
                <Button variant="outline" className="border-brand text-brand hover:bg-brand/10">Dry run</Button>
                <Button className="bg-brand text-black hover:bg-brand/90">Transfer</Button>
              </div>
              <div className="rounded-lg border p-4 text-sm">
                <p className="mb-1 font-medium">Example result</p>
                <p className="text-muted-foreground">Migrated 1 playlist • 63 tracks • kept order</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-3 py-10 sm:px-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold sm:text-3xl">Free forever</h2>
        <p className="text-muted-foreground">All features, no payments.</p>
      </div>
      <div className="grid gap-4 sm:max-w-lg sm:mx-auto">
        <Card className="border-brand">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>All features, free forever</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 text-sm">
              <li className="inline-flex items-center gap-2"><Check className="text-brand size-4"/> Unlimited transfers</li>
              <li className="inline-flex items-center gap-2"><Check className="text-brand size-4"/> Unlimited synced playlists</li>
              <li className="inline-flex items-center gap-2"><Check className="text-brand size-4"/> Email support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-brand text-black hover:bg-brand/90">Use for free</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-3 py-10 sm:px-6">
      <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">Frequently asked questions</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="q1">
          <AccordionTrigger>Do I need a premium subscription?</AccordionTrigger>
          <AccordionContent>Most features work with a free account in this demo. Production may require premium for certain actions.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="q2">
          <AccordionTrigger>Will my playlists be modified immediately?</AccordionTrigger>
          <AccordionContent>Only when you confirm. You can always run a dry‑run to preview changes before committing.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="q3">
          <AccordionTrigger>Is my data safe?</AccordionTrigger>
          <AccordionContent>Yes. We use OAuth and request the minimum scopes required. This demo does not send data to any server.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}

function RunningActivity() {
  const [items, setItems] = useState([
    { id: 'a', icon: Repeat2, name: 'Sync playlists', detail: 'Indie Mix ↔ Focus Beats', progress: 18, status: 'running' as const },
    { id: 'b', icon: Upload, name: 'Transfer playlist', detail: 'Chill Vibes → New account', progress: 42, status: 'running' as const },
    { id: 'c', icon: Sparkles, name: 'Cleanup duplicates', detail: 'Library hygiene', progress: 100, status: 'done' as const }
  ]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setItems((prev) =>
        prev.map((it) => {
          if (it.status !== 'running') return it;
          const next = Math.min(100, it.progress + Math.floor(Math.random() * 8 + 2));

          return { ...it, progress: next, status: next >= 100 ? 'done' : 'running' };
        })
      );
    }, 1200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-3 py-10 sm:px-6">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Running activity</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((it) => {
          const Icon = it.icon;
          const done = it.status === 'done';

          return (
            <Card key={it.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex size-8 items-center justify-center rounded-md bg-brand text-black"><Icon className="size-4"/></span>
                    <div>
                      <CardTitle className="text-base">{it.name}</CardTitle>
                      <CardDescription>{it.detail}</CardDescription>
                    </div>
                  </div>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs ${done ? 'bg-muted text-muted-foreground' : 'bg-brand text-black'}`}>
                    {done ? 'Completed' : 'Running'}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{it.progress}%</span>
                </div>
                <Progress value={it.progress} />
                <div className="mt-3 flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-brand text-brand hover:bg-brand/10"
                    disabled={!done}
                    onClick={() => setItems((prev) => prev.filter((x) => x.id !== it.id))}
                  >
                    Dismiss
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl px-3 py-10 sm:px-6">
      <h2 className="mb-4 text-2xl font-bold sm:text-3xl">How it works</h2>
      <Tabs defaultValue="sync">
        <TabsList>
          <TabsTrigger value="sync">Sync</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
        </TabsList>
        <TabsContent value="sync" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Synchronize songs in playlists</CardTitle>
              <CardDescription>Mirror additions and removals between two playlists across accounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Connect the two accounts you want to keep in sync.</li>
                <li>Select the source and target playlists.</li>
                <li>Run sync to apply adds/removes to the target.</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transfer" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Transfer a playlist</CardTitle>
              <CardDescription>Copy a playlist to another account and keep the order where possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Connect source and destination accounts.</li>
                <li>Choose the playlist to move.</li>
                <li>Transfer to create a new playlist on the destination.</li>
              </ol>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function StatesDoc() {
  return (
    <section className="mx-auto max-w-7xl px-3 py-10 sm:px-6">
      <h2 className="mb-4 text-2xl font-bold">UI states (docs)</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Enabled, disabled, loading</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button className="bg-brand text-black hover:bg-brand/90">Primary</Button>
            <Button disabled className="bg-brand text-black">Disabled</Button>
            <Button variant="outline" className="border-brand text-brand hover:bg-brand/10">Outline</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skeletons</CardTitle>
            <CardDescription>Loading placeholders</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-24" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Toasts</CardTitle>
            <CardDescription>Success and error</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button
              onClick={() => toast.success('Success', { description: 'Everything worked as expected' })}
              className="bg-brand text-black hover:bg-brand/90">
              Show success
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error('Something went wrong', { description: 'Please try again' })}
              className="border-brand text-brand hover:bg-brand/10">
              Show error
            </Button>
          </CardContent>
        </Card>
        <Card className="hidden">
          <CardHeader>
            <CardTitle>Hidden state</CardTitle>
            <CardDescription>Rendered but not visible</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">This content exists for documentation and testing.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-10 border-t">
      <div className="mx-auto max-w-7xl px-3 py-6 pb-8 text-sm text-muted-foreground sm:px-6">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Music Library Assistant</p>
          <div className="flex flex-wrap items-center gap-3">
            <span>Free forever</span>
            <a href="#privacy" className="hover:underline">Privacy</a>
            <a href="#terms" className="hover:underline">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function MlaLanding() {
  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <Hero />
      <Features />
      <HowItWorks />
      <SimulatorStepper />
      <RunningActivity />
      <Pricing />
      <Faq />
      <StatesDoc />
      <Footer />
    </main>
  );
}
