import { PageShell, HeroPanel, Eyebrow } from '../styles/AppStyles'

function HomePage() {
  return (
    <PageShell>
      <HeroPanel>
        <Eyebrow>Announcement App</Eyebrow>
        <h1>Frontend Routes Ready</h1>
        <p style={{ maxWidth: '58ch', fontSize: '1.05rem', lineHeight: '1.7', color: '#566578' }}>
          Open <code>/user</code> to view the user announcement popup page.
        </p>
      </HeroPanel>
    </PageShell>
  )
}

export default HomePage
