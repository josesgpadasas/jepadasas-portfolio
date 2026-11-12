import { readFileSync } from 'node:fs';
import path from 'node:path';
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import type { PortfolioExperience, PortfolioProfile } from '@/lib/portfolio';

export const SITE_URL = 'https://im-josesgpadasas.vercel.app';

const ASSETS = path.join(process.cwd(), 'src', 'assets');
const font = (file: string) =>
  `data:font/ttf;base64,${readFileSync(path.join(ASSETS, 'fonts', file)).toString('base64')}`;

Font.register({
  family: 'Jakarta',
  fonts: [
    { src: font('PlusJakartaSans-Regular.ttf'), fontWeight: 400 },
    { src: font('PlusJakartaSans-Medium.ttf'), fontWeight: 500 },
    { src: font('PlusJakartaSans-SemiBold.ttf'), fontWeight: 600 },
    { src: font('PlusJakartaSans-Bold.ttf'), fontWeight: 700 },
    { src: font('PlusJakartaSans-ExtraBold.ttf'), fontWeight: 800 },
  ],
});
Font.register({
  family: 'Plex Mono',
  fonts: [
    { src: font('IBMPlexMono-Regular.ttf'), fontWeight: 400 },
    { src: font('IBMPlexMono-Medium.ttf'), fontWeight: 500 },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

const C = {
  navy: '#1b2a4e',
  navySoft: '#2e4470',
  accent: '#4a6fa5',
  sky: '#b9d1ea',
  teal: '#0f766e',
  signal: '#5eead4',
  ink: '#1f2937',
  muted: '#566074',
  border: '#d9e1ec',
  panel: '#f3f6fa',
  white: '#ffffff',
};

const s = StyleSheet.create({
  page: {
    fontFamily: 'Jakarta',
    fontSize: 9.5,
    color: C.ink,
    lineHeight: 1.5,
    paddingTop: 44,
    paddingBottom: 56,
    paddingHorizontal: 44,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.navy,
    marginTop: -44,
    marginHorizontal: -44,
    paddingHorizontal: 44,
    paddingTop: 30,
    paddingBottom: 26,
    marginBottom: 0,
  },
  heroText: { flex: 1, paddingRight: 24 },
  eyebrow: {
    fontFamily: 'Plex Mono',
    fontSize: 7.5,
    letterSpacing: 1.6,
    color: C.sky,
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 26,
    fontWeight: 800,
    color: C.white,
    letterSpacing: -0.6,
    lineHeight: 1.1,
    marginTop: 8,
  },
  title: { fontSize: 12.5, fontWeight: 600, color: C.sky, marginTop: 6 },
  headline: { fontSize: 9, color: '#c9d6e8', marginTop: 3 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 14 },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 3,
  },
  contactLabel: {
    fontFamily: 'Plex Mono',
    fontSize: 6.5,
    letterSpacing: 1.2,
    color: C.signal,
    textTransform: 'uppercase',
    marginRight: 5,
  },
  contactValue: { fontSize: 8.5, color: C.white, textDecoration: 'none' },
  portraitFrame: {
    width: 104,
    height: 121,
    borderWidth: 3,
    borderColor: C.white,
    backgroundColor: C.white,
  },
  portrait: { width: '100%', height: '100%', objectFit: 'cover' },
  accentBar: {
    flexDirection: 'row',
    height: 4,
    marginHorizontal: -44,
    marginBottom: 14,
  },

  metaRow: { flexDirection: 'row', marginBottom: 6 },
  metaCell: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.panel,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  metaLabel: {
    fontFamily: 'Plex Mono',
    fontSize: 6.5,
    letterSpacing: 1.1,
    color: C.muted,
    textTransform: 'uppercase',
  },
  metaValue: { fontSize: 9, fontWeight: 600, color: C.navy, marginTop: 2 },

  section: { marginTop: 14 },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    paddingBottom: 6,
    marginBottom: 9,
  },
  sectionCode: {
    fontFamily: 'Plex Mono',
    fontSize: 7.5,
    fontWeight: 500,
    color: C.navy,
    borderWidth: 1,
    borderColor: C.navy,
    backgroundColor: C.panel,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginRight: 9,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: C.navy,
    letterSpacing: -0.1,
  },
  sectionHint: {
    marginLeft: 'auto',
    fontFamily: 'Plex Mono',
    fontSize: 6.5,
    letterSpacing: 1.1,
    color: C.accent,
    textTransform: 'uppercase',
  },

  paragraph: { fontSize: 9.5, color: C.ink, lineHeight: 1.65 },

  grid2: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -4 },
  focusCell: { width: '50%', paddingHorizontal: 4, marginBottom: 5 },
  focusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 6,
    paddingHorizontal: 9,
  },
  focusIndex: {
    fontFamily: 'Plex Mono',
    fontSize: 8,
    fontWeight: 500,
    color: C.accent,
    marginRight: 8,
  },
  focusText: { fontSize: 9, fontWeight: 600, color: C.navy },

  agency: { marginBottom: 10 },
  agencyHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  agencyDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: C.navy,
    marginRight: 8,
  },
  agencyName: { fontSize: 10, fontWeight: 700, color: C.navy, flex: 1 },
  agencySpan: {
    fontFamily: 'Plex Mono',
    fontSize: 7.5,
    color: C.muted,
  },
  roles: {
    marginLeft: 3,
    paddingLeft: 13,
    borderLeftWidth: 1,
    borderLeftColor: C.sky,
  },
  role: { flexDirection: 'row', marginBottom: 5 },
  roleMain: { flex: 1, paddingRight: 12 },
  roleTitle: { fontSize: 9.5, fontWeight: 600, color: C.ink },
  roleUnit: { fontSize: 8.5, color: C.muted, marginTop: 1 },
  rolePeriod: {
    fontFamily: 'Plex Mono',
    fontSize: 7.5,
    color: C.accent,
    width: 108,
    textAlign: 'right',
    paddingTop: 1.5,
  },
  currentBadge: {
    fontFamily: 'Plex Mono',
    fontSize: 6,
    letterSpacing: 1,
    color: C.teal,
    borderWidth: 0.75,
    borderColor: C.teal,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginLeft: 6,
    textTransform: 'uppercase',
  },

  capCell: { width: '50%', paddingHorizontal: 4, marginBottom: 8 },
  capCard: {
    borderWidth: 1,
    borderColor: C.border,
    borderTopWidth: 2.5,
    borderTopColor: C.sky,
    paddingVertical: 7,
    paddingHorizontal: 9,
    flexGrow: 1,
  },
  capTitle: { fontSize: 9.5, fontWeight: 700, color: C.navy },
  capDesc: { fontSize: 8.3, color: C.muted, marginTop: 3, lineHeight: 1.5 },
  capTools: {
    fontFamily: 'Plex Mono',
    fontSize: 7,
    color: C.accent,
    marginTop: 6,
  },

  chips: { flexDirection: 'row', flexWrap: 'wrap', marginRight: -5 },
  chip: {
    fontFamily: 'Plex Mono',
    fontSize: 7.5,
    color: C.navy,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.panel,
    paddingVertical: 2,
    paddingHorizontal: 7,
    marginRight: 5,
    marginBottom: 5,
  },

  eduRow: { flexDirection: 'row', alignItems: 'flex-start' },

  project: {
    borderWidth: 1,
    borderColor: C.border,
    borderLeftWidth: 3,
    borderLeftColor: C.navy,
    paddingVertical: 7,
    paddingHorizontal: 11,
    marginBottom: 6,
  },
  projectHead: { flexDirection: 'row', alignItems: 'flex-start' },
  projectIndex: {
    fontFamily: 'Plex Mono',
    fontSize: 7.5,
    fontWeight: 500,
    color: C.accent,
    width: 18,
    paddingTop: 1.5,
  },
  projectTitle: { fontSize: 10, fontWeight: 700, color: C.navy },
  projectOrg: { fontSize: 8, color: C.muted, marginTop: 1 },
  projectBody: { paddingLeft: 18, marginTop: 3 },
  projectSummary: { fontSize: 8.4, color: C.ink, lineHeight: 1.45 },
  bullet: { flexDirection: 'row', marginTop: 1.5 },
  bulletMark: {
    width: 3,
    height: 3,
    backgroundColor: C.accent,
    marginTop: 4.6,
    marginRight: 6,
  },
  bulletText: { flex: 1, fontSize: 8.2, color: C.muted, lineHeight: 1.4 },
  projectFoot: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 4,
  },
  footLabel: {
    fontFamily: 'Plex Mono',
    fontSize: 6.5,
    letterSpacing: 1,
    color: C.muted,
    textTransform: 'uppercase',
    marginRight: 5,
  },
  footValue: {
    fontFamily: 'Plex Mono',
    fontSize: 7.3,
    color: C.navySoft,
    marginRight: 14,
  },
  footLink: {
    fontFamily: 'Plex Mono',
    fontSize: 7.3,
    color: C.accent,
    textDecoration: 'underline',
    marginRight: 10,
  },

  runningHead: {
    position: 'absolute',
    top: 20,
    left: 44,
    right: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.75,
    borderBottomColor: C.border,
    paddingBottom: 5,
  },
  runningText: {
    fontFamily: 'Plex Mono',
    fontSize: 6.5,
    letterSpacing: 1.1,
    color: C.muted,
    textTransform: 'uppercase',
  },
  footer: {
    position: 'absolute',
    top: 804,
    left: 44,
    right: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.75,
    borderTopColor: C.border,
    paddingTop: 6,
  },
  footerText: {
    fontFamily: 'Plex Mono',
    fontSize: 6.8,
    color: C.muted,
    letterSpacing: 0.6,
  },
  footerLink: {
    fontFamily: 'Plex Mono',
    fontSize: 6.8,
    color: C.accent,
    textDecoration: 'none',
    letterSpacing: 0.6,
  },
});

type AgencyGroup = {
  agency: string;
  roles: (PortfolioExperience & { unit: string })[];
};

function splitOrganization(organization: string): [string, string] {
  const index = organization.indexOf(' – ');
  if (index === -1) return [organization, ''];
  return [organization.slice(0, index), organization.slice(index + 3)];
}

function groupByAgency(experience: PortfolioExperience[]): AgencyGroup[] {
  const groups: AgencyGroup[] = [];
  for (const item of experience) {
    const [agency, unit] = splitOrganization(item.organization);
    const last = groups.at(-1);
    if (last?.agency === agency) {
      last.roles.push({ ...item, unit });
    } else {
      groups.push({ agency, roles: [{ ...item, unit }] });
    }
  }
  return groups;
}

function groupSpan(group: AgencyGroup): string {
  const start = group.roles.at(-1)?.period.split(' – ')[0] ?? '';
  const end = group.roles[0]?.period.split(' – ').at(-1) ?? '';
  return start && end && start !== end ? `${start} – ${end}` : end;
}

function displayUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

function SectionHead({
  code,
  title,
  hint,
}: {
  code: string;
  title: string;
  hint?: string;
}) {
  return (
    <View style={s.sectionHead} minPresenceAhead={60}>
      <Text style={s.sectionCode}>{code}</Text>
      <Text style={s.sectionTitle}>{title}</Text>
      {hint ? <Text style={s.sectionHint}>{hint}</Text> : null}
    </View>
  );
}

function PageChrome({ profile }: { profile: PortfolioProfile }) {
  return (
    <>
      <View
        fixed
        style={s.runningHead}
        render={({ pageNumber }) =>
          pageNumber > 1 ? (
            <>
              <Text style={s.runningText}>{profile.name}</Text>
              <Text style={s.runningText}>{profile.title}</Text>
            </>
          ) : null
        }
      />
      <View
        fixed
        style={s.footer}
        render={({
          pageNumber,
          totalPages,
        }: {
          pageNumber: number;
          totalPages?: number;
        }) => (
          <>
            <Text style={s.footerText}>{profile.name} · Portfolio</Text>
            <Text style={s.footerLink}>{displayUrl(SITE_URL)}</Text>
            <Text style={s.footerText}>
              Page {pageNumber} of {totalPages}
            </Text>
          </>
        )}
      />
    </>
  );
}

function RoleRow({ role }: { role: AgencyGroup['roles'][number] }) {
  return (
    <View style={s.role} wrap={false}>
      <View style={s.roleMain}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={s.roleTitle}>{role.role}</Text>
          {/present/i.test(role.period) ? (
            <Text style={s.currentBadge}>Current</Text>
          ) : null}
        </View>
        {role.unit ? <Text style={s.roleUnit}>{role.unit}</Text> : null}
        {role.highlights.map((point) => (
          <View key={point} style={s.bullet}>
            <View style={s.bulletMark} />
            <Text style={s.bulletText}>{point}</Text>
          </View>
        ))}
      </View>
      <Text style={s.rolePeriod}>{role.period}</Text>
    </View>
  );
}

export function PortfolioDocument({ profile }: { profile: PortfolioProfile }) {
  const agencies = groupByAgency(profile.experience);
  const portrait = `data:image/jpeg;base64,${readFileSync(
    path.join(process.cwd(), 'public', 'profile.jpg'),
  ).toString('base64')}`;
  const contacts = [
    { label: 'Portfolio', href: SITE_URL },
    ...profile.links,
  ];
  let sectionIndex = 0;
  const nextCode = () => String(++sectionIndex).padStart(2, '0');

  return (
    <Document
      title={`${profile.name} — Portfolio`}
      author={profile.name}
      subject={`${profile.title} · Portfolio`}
      keywords="portfolio, information systems, government, Philippines"
      creator={SITE_URL}
      producer={SITE_URL}
      language="en"
    >
      <Page size="A4" style={s.page}>
        <PageChrome profile={profile} />

        <View style={s.hero}>
          <View style={s.heroText}>
            <Text style={s.eyebrow}>{profile.location}</Text>
            <Text style={s.name}>{profile.name}</Text>
            <Text style={s.title}>{profile.title}</Text>
            <Text style={s.headline}>{profile.headline}</Text>
            <View style={s.contactRow}>
              {contacts.map((link) => (
                <View key={link.href} style={s.contactItem}>
                  <Text style={s.contactLabel}>{link.label}</Text>
                  <Link src={link.href} style={s.contactValue}>
                    {displayUrl(link.href)}
                  </Link>
                </View>
              ))}
            </View>
          </View>
          <View style={s.portraitFrame}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image has no alt */}
            <Image src={portrait} style={s.portrait} />
          </View>
        </View>
        <View style={s.accentBar}>
          <View style={{ flex: 3, backgroundColor: C.accent }} />
          <View style={{ flex: 1, backgroundColor: C.signal }} />
        </View>

        <View style={s.metaRow}>
          {[
            ['Sector', 'National Government'],
            ['Current Agency', 'Department of Agriculture'],
            ['Eligibility', 'Career Service Professional'],
          ].map(([label, value], i) => (
            <View
              key={label}
              style={[s.metaCell, i > 0 ? { marginLeft: 6 } : {}]}
            >
              <Text style={s.metaLabel}>{label}</Text>
              <Text style={s.metaValue}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={s.section}>
          <SectionHead code={nextCode()} title="Professional Summary" />
          <Text style={s.paragraph}>{profile.summary}</Text>
        </View>

        {profile.focusAreas.length > 0 ? (
          <View style={s.section} wrap={false}>
            <SectionHead code={nextCode()} title="Current Focus" />
            <View style={s.grid2}>
              {profile.focusAreas.map((area, i) => (
                <View key={area} style={s.focusCell}>
                  <View style={s.focusCard}>
                    <Text style={s.focusIndex}>
                      {String(i + 1).padStart(2, '0')}
                    </Text>
                    <Text style={s.focusText}>{area}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={s.section}>
          <SectionHead
            code={nextCode()}
            title="Work Experience"
            hint={`${profile.experience.length} roles · ${agencies.length} agencies`}
          />
          {agencies.map((group) => {
            const [first, ...rest] = group.roles;
            return (
              <View key={group.agency} style={s.agency}>
                <View wrap={false}>
                  <View style={s.agencyHead}>
                    <View style={s.agencyDot} />
                    <Text style={s.agencyName}>{group.agency}</Text>
                    <Text style={s.agencySpan}>{groupSpan(group)}</Text>
                  </View>
                  <View style={s.roles}>
                    <RoleRow role={first} />
                  </View>
                </View>
                {rest.length > 0 ? (
                  <View style={s.roles}>
                    {rest.map((role) => (
                      <RoleRow key={`${role.role}-${role.period}`} role={role} />
                    ))}
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        {profile.education.length > 0 ? (
          <View style={s.section} wrap={false}>
            <SectionHead code={nextCode()} title="Education" />
            {profile.education.map((item) => (
              <View
                key={`${item.institution}-${item.period}`}
                style={[s.eduRow, { marginBottom: 6 }]}
              >
                <View style={s.roleMain}>
                  <Text style={s.roleTitle}>{item.degree}</Text>
                  <Text style={s.roleUnit}>
                    {[item.institution, item.location].filter(Boolean).join(' · ')}
                  </Text>
                </View>
                <Text style={s.rolePeriod}>{item.period}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {profile.capabilities.length > 0 ? (
          <View style={s.section}>
            <SectionHead code={nextCode()} title="Skills & Capabilities" />
            <View style={s.grid2}>
              {profile.capabilities.map((cap) => (
                <View key={cap.title} style={s.capCell} wrap={false}>
                  <View style={s.capCard}>
                    <Text style={s.capTitle}>{cap.title}</Text>
                    <Text style={s.capDesc}>{cap.description}</Text>
                    {cap.tools.length > 0 ? (
                      <Text style={s.capTools}>{cap.tools.join(' · ')}</Text>
                    ) : null}
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {profile.competencies.length > 0 ? (
          <View style={s.section} wrap={false}>
            <SectionHead
              code={nextCode()}
              title="Technology Stack"
              hint={`${profile.competencies.length} tools`}
            />
            <View style={s.chips}>
              {profile.competencies.map((item) => (
                <Text key={item} style={s.chip}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        ) : null}
      </Page>

      {profile.projects.length > 0 ? (
        <Page size="A4" style={s.page}>
          <PageChrome profile={profile} />
          <View>
            <SectionHead
              code={nextCode()}
              title="Previous Projects"
              hint={`${profile.projects.length} systems & platforms`}
            />
            {profile.projects.map((project, i) => (
              <View
                key={`${project.title}-${project.period}`}
                style={s.project}
                wrap={false}
              >
                <View style={s.projectHead}>
                  <Text style={s.projectIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <View style={{ flex: 1, paddingRight: 10 }}>
                    <Text style={s.projectTitle}>{project.title}</Text>
                    <Text style={s.projectOrg}>{project.organization}</Text>
                  </View>
                  <Text style={[s.rolePeriod, { width: 80 }]}>
                    {project.period}
                  </Text>
                </View>
                <View style={s.projectBody}>
                  <Text style={s.projectSummary}>{project.summary}</Text>
                  {project.highlights.map((point) => (
                    <View key={point} style={s.bullet}>
                      <View style={s.bulletMark} />
                      <Text style={s.bulletText}>{point}</Text>
                    </View>
                  ))}
                  {project.tools.length > 0 || project.links.length > 0 ? (
                    <View style={s.projectFoot}>
                      {project.tools.length > 0 ? (
                        <>
                          <Text style={s.footLabel}>Tools</Text>
                          <Text style={s.footValue}>
                            {project.tools.join(' · ')}
                          </Text>
                        </>
                      ) : null}
                      {project.links.length > 0 ? (
                        <>
                          <Text style={s.footLabel}>Links</Text>
                          {project.links.map((link) => (
                            <Link
                              key={link.href}
                              src={link.href}
                              style={s.footLink}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </>
                      ) : null}
                    </View>
                  ) : null}
                </View>
              </View>
            ))}
          </View>
        </Page>
      ) : null}
    </Document>
  );
}
