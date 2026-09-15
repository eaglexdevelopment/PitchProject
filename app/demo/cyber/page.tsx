'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './cyber.module.css';

export default function CyberDemoPage() {
  const [prompt, setPrompt] = useState('Generate high-frequency trading arbitrage bot with rust bindings');
  const [output, setOutput] = useState<string | null>(
    `[INFO] Initializing Quantum Inference Kernel v4.8...
[SUCCESS] Parsed AST Tree • 18 Sub-modules synthesized
[OUTPUT] Generated ArbitragePipeline<OrderBook> in 14.2ms
{
  "latency_p99": "0.42ms",
  "throughput": "480k tx/sec",
  "verification": "ZK-SNARK Certified"
}`
  );
  const [loading, setLoading] = useState(false);

  const samplePrompts = [
    'Generate high-frequency trading arbitrage bot with rust bindings',
    'Synthesize autonomous vector search agent swarm',
    'Compile WebAssembly zero-knowledge zkRollup validator',
    'Optimize LLM inference batching for edge TPU clusters'
  ];

  const handleSimulate = (pText?: string) => {
    const textToRun = pText || prompt;
    setLoading(true);
    setOutput('[GENERATING] Ingesting neural tokens across 4,096 distributed GPU shards...');
    
    setTimeout(() => {
      setLoading(false);
      setOutput(`[PROMPT] >> "${textToRun}"
[STATUS] Compilation Complete • Zero Allocations Detected
{
  "model": "EagleX-Neural-70B-FP8",
  "token_count": 842,
  "ttft_ms": 11.8,
  "verification_hash": "0x7f9a2c...b819e",
  "deployment_url": "https://edge.quantum.ai/agent-${Math.floor(Math.random()*90000+10000)}"
}`);
    }, 600);
  };

  return (
    <div className={styles.container}>
      {/* 1. Header */}
      <header className={styles.navbar}>
        <div className={styles.navInner}>
          <Link href="/demo" className={styles.brandLogo}>
            <div className={styles.logoPulse}></div>
            <span>SYNAPSE // NEURAL</span>
          </Link>

          <nav>
            <ul className={styles.navLinks}>
              <li><a href="#terminal" className={styles.navLink}>LIVE TERMINAL</a></li>
              <li><a href="#benchmarks" className={styles.navLink}>BENCHMARKS</a></li>
              <li><a href="#architecture" className={styles.navLink}>ARCHITECTURE</a></li>
              <li><a href="#tokenomics" className={styles.navLink}>PROTOCOL</a></li>
            </ul>
          </nav>

          <a href="#terminal" className={styles.navCta}>
            CLAIM API KEY ⚡
          </a>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroChip}>
          <span>🔮</span> NEXT-GEN NEURAL RUNTIME // 128K CONTEXT WINDOW
        </div>

        <h1 className={styles.heroTitle}>
          The Decentralized <span className={styles.neonGradient}>Neural Compute Mesh</span> For Superintelligence.
        </h1>

        <p className={styles.heroDesc}>
          Execute sub-millisecond AI inference, autonomous agent swarms, and zero-knowledge verifiable intelligence across global edge cluster topology.
        </p>

        {/* 3. Interactive Neural Terminal */}
        <div id="terminal" className={styles.terminalContainer}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <div className={styles.dot} style={{ background: '#ef4444' }}></div>
              <div className={styles.dot} style={{ background: '#f59e0b' }}></div>
              <div className={styles.dot} style={{ background: '#10b981' }}></div>
            </div>
            <div className={styles.terminalTitle}>synapse-kernel-cli --target=edge-cluster-us-east</div>
            <div style={{ fontSize: '0.72rem', color: '#10b981' }}>● ONLINE</div>
          </div>

          <div className={styles.terminalBody}>
            <div className={styles.promptChips}>
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  className={styles.chipBtn}
                  onClick={() => {
                    setPrompt(p);
                    handleSimulate(p);
                  }}
                >
                  {p.slice(0, 32)}...
                </button>
              ))}
            </div>

            <div className={styles.promptInputRow}>
              <input
                type="text"
                className={styles.terminalInput}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter natural language system prompt..."
              />
              <button 
                className={styles.runBtn}
                onClick={() => handleSimulate()}
                disabled={loading}
              >
                {loading ? 'RUNNING...' : 'EXECUTE INFERENCE ⚡'}
              </button>
            </div>

            <div className={styles.outputBox}>
              {output}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benchmarks Grid */}
      <section id="benchmarks" className={styles.benchmarksSection}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className={styles.heroChip}>REALTIME BENCHMARKS</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', margin: '0 0 0.5rem 0' }}>
            Unrivaled Computational Density
          </h2>
        </div>

        <div className={styles.benchmarksGrid}>
          <div className={styles.benchmarkCard}>
            <div className={styles.benchmarkVal}>11.2ms</div>
            <div className={styles.benchmarkLabel}>Time To First Token (TTFT)</div>
          </div>

          <div className={styles.benchmarkCard}>
            <div className={styles.benchmarkVal}>480 T/s</div>
            <div className={styles.benchmarkLabel}>Sustained Stream Throughput</div>
          </div>

          <div className={styles.benchmarkCard}>
            <div className={styles.benchmarkVal}>99.999%</div>
            <div className={styles.benchmarkLabel}>Consensus Determinism</div>
          </div>

          <div className={styles.benchmarkCard}>
            <div className={styles.benchmarkVal}>$0.0001</div>
            <div className={styles.benchmarkLabel}>Cost Per 100k Generated Tokens</div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div>© {new Date().getFullYear()} SYNAPSE NEURAL COMPUTATION LABS. ALL SYSTEMS VERIFIED.</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link href="/demo" style={{ color: '#06b6d4', textDecoration: 'none' }}>Theme Directory</Link>
            <Link href="/admin/pages" style={{ color: '#a78bfa', textDecoration: 'none' }}>Admin Control</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
