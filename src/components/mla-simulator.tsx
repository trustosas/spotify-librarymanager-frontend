'use client';

import { useMemo, useState } from 'react';

import { Badge } from '@/registry/new-york-v4/ui/badge';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/registry/new-york-v4/ui/card';
import { Checkbox } from '@/registry/new-york-v4/ui/checkbox';
import { Input } from '@/registry/new-york-v4/ui/input';
import { Label } from '@/registry/new-york-v4/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york-v4/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york-v4/ui/tabs';
import { Check, ListMusic, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

const samplePlaylists = [
  { id: 'pl-1', name: 'Chill Vibes', tracks: 37 },
  { id: 'pl-2', name: 'Focus Beats', tracks: 63 },
  { id: 'pl-3', name: 'Throwback 2000s', tracks: 92 },
  { id: 'pl-4', name: 'Daily Mix Indie', tracks: 48 }
];

const accountEmails = {
  'user-a': 'user-a@example.com',
  'user-b': 'user-b@example.com',
  'user-c': 'user-c@example.com'
} as const;

type AccountId = keyof typeof accountEmails;

export default function SimulatorStepper() {
  const [step, setStep] = useState(1);
  const [action, setAction] = useState<'sync' | 'transfer'>('sync');
  const [sourceConnected, setSourceConnected] = useState(false);
  const [destConnected, setDestConnected] = useState(false);
  const [sourceAccount, setSourceAccount] = useState<AccountId>('user-a');
  const [destAccount, setDestAccount] = useState<AccountId>('user-b');
  const [selected, setSelected] = useState<string[]>([]);
  const [targetPlaylist, setTargetPlaylist] = useState<string>('create-new');
  const [newPlaylistName, setNewPlaylistName] = useState('Synced Playlist');

  const canNext1 = sourceConnected;
  const canNext2 = selected.length > 0;
  const canNext3 = action === 'transfer' ? destConnected : destConnected && targetPlaylist !== '';

  const summary = useMemo(
    () => ({
      action,
      from: sourceAccount,
      to: destAccount,
      playlists: selected.map((id) => samplePlaylists.find((p) => p.id === id)?.name).filter(Boolean)
    }),
    [action, sourceAccount, destAccount, selected]
  );

  return (
    <section id="demo" className="mx-auto max-w-7xl px-3 py-2 sm:px-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><span className="inline-flex size-7 items-center justify-center rounded-md bg-brand text-black"><ListMusic className="size-4"/></span> Connect, select, and run</CardTitle>
          <CardDescription>Step {step} of 4</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Tabs value={action} onValueChange={(v) => setAction(v as 'sync' | 'transfer')}>
            <TabsList>
              <TabsTrigger value="sync">Sync</TabsTrigger>
              <TabsTrigger value="transfer">Transfer</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Stepper header */}
          <div className="grid gap-2 sm:grid-cols-4">
            <div className={`rounded-md border p-2 text-sm ${step === 1 ? 'border-brand' : ''}`}>
              <div className="flex items-center gap-2"><User className="size-4"/> Connect source</div>
              <Badge variant="secondary" className="mt-2">{sourceConnected ? 'Connected' : 'Not connected'}</Badge>
              {sourceConnected && (
                <p className="mt-1 text-xs text-muted-foreground">{accountEmails[sourceAccount]}</p>
              )}
            </div>
            <div className={`rounded-md border p-2 text-sm ${step === 2 ? 'border-brand' : ''}`}>
              <div className="flex items-center gap-2"><ListMusic className="size-4"/> Select playlists</div>
              <Badge variant="secondary" className="mt-2">{selected.length} selected</Badge>
            </div>
            <div className={`rounded-md border p-2 text-sm ${step === 3 ? 'border-brand' : ''}`}>
              <div className="flex items-center gap-2"><Lock className="size-4"/> Connect destination</div>
              <Badge variant="secondary" className="mt-2">{destConnected ? 'Connected' : 'Not connected'}</Badge>
              {destConnected && (
                <p className="mt-1 text-xs text-muted-foreground">{accountEmails[destAccount]}</p>
              )}
            </div>
            <div className={`rounded-md border p-2 text-sm ${step === 4 ? 'border-brand' : ''}`}>
              <div className="flex items-center gap-2"><Check className="size-4"/> Review & run</div>
            </div>
          </div>

          {step === 1 && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="src">Source account</Label>
                <Select value={sourceAccount} onValueChange={(v) => setSourceAccount(v as AccountId)}>
                  <SelectTrigger id="src"><SelectValue placeholder="Choose account" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user-a">user-a</SelectItem>
                    <SelectItem value="user-b">user-b</SelectItem>
                    <SelectItem value="user-c">user-c</SelectItem>
                  </SelectContent>
                </Select>
                {sourceConnected && (
                  <p className="text-xs text-muted-foreground">{accountEmails[sourceAccount]}</p>
                )}
              </div>
              <div className="flex items-end gap-2">
                <Button
                  type="button"
                  onClick={() => { setSourceConnected(true); toast('Source connected via OAuth'); }}
                  className="bg-brand text-black hover:bg-brand/90">
                  Connect with OAuth
                </Button>
                {sourceConnected && <Badge className="bg-brand text-black">Connected</Badge>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-3">
              <p className="text-sm text-muted-foreground">Choose playlists from the connected source account.</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {samplePlaylists.map((p) => (
                  <label key={p.id} className="flex cursor-pointer items-center justify-between gap-3 rounded-md border p-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selected.includes(p.id)}
                        onCheckedChange={(v) => {
                          if (v) setSelected((s) => Array.from(new Set([...s, p.id])));
                          else setSelected((s) => s.filter((x) => x !== p.id));
                        }}
                      />
                      <div>
                        <p className="text-sm font-medium leading-tight">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.tracks} tracks</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="dst">Destination account</Label>
                  <Select value={destAccount} onValueChange={(v) => setDestAccount(v as AccountId)}>
                    <SelectTrigger id="dst"><SelectValue placeholder="Choose account" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user-b">user-b</SelectItem>
                      <SelectItem value="user-c">user-c</SelectItem>
                    </SelectContent>
                  </Select>
                  {destConnected && (
                    <p className="text-xs text-muted-foreground">{accountEmails[destAccount]}</p>
                  )}
                </div>
                <div className="flex items-end">
                  <Button type="button" onClick={() => { setDestConnected(true); toast('Destination connected via OAuth'); }} className="bg-brand text-black hover:bg-brand/90">Connect with OAuth</Button>
                </div>
              </div>

              {action === 'sync' && (
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="target">Target playlist</Label>
                    <Select value={targetPlaylist} onValueChange={setTargetPlaylist}>
                      <SelectTrigger id="target"><SelectValue placeholder="Select or create" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="create-new">Create new playlist</SelectItem>
                        <SelectItem value="pl-dest-1">My Favorite Songs</SelectItem>
                        <SelectItem value="pl-dest-2">Gym Mix</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {targetPlaylist === 'create-new' && (
                    <div className="space-y-2">
                      <Label htmlFor="newname">New playlist name</Label>
                      <Input id="newname" value={newPlaylistName} onChange={(e) => setNewPlaylistName(e.target.value)} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="rounded-lg border p-4 text-sm">
              <p className="mb-2 font-medium">Review</p>
              <ul className="grid gap-1">
                <li>Action: <strong>{summary.action}</strong></li>
                <li>From: <strong>{summary.from} ({accountEmails[summary.from]})</strong></li>
                <li>To: <strong>{summary.to} ({accountEmails[summary.to]})</strong></li>
                <li>Playlists: <strong>{summary.playlists.join(', ') || '—'}</strong></li>
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <div className="text-sm text-muted-foreground">Step {step}/4</div>
          <div className="flex gap-2">
            <Button variant="outline" disabled={step === 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</Button>
            {step < 4 && (
              <Button
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                disabled={(step === 1 && !canNext1) || (step === 2 && !canNext2) || (step === 3 && !canNext3)}
                className="bg-brand text-black hover:bg-brand/90 disabled:opacity-50">
                Next
              </Button>
            )}
            {step === 4 && (
              <Button
                onClick={() => toast.success(action === 'sync' ? 'Sync complete' : 'Transfer complete', { description: `${selected.length} playlist(s) processed` })}
                className="bg-brand text-black hover:bg-brand/90">
                Run
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </section>
  );
}
