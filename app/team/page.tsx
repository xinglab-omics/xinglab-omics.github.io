import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { PersonAvatar } from "@/components/PersonAvatar";
import { members } from "@/lib/content";

const groups = ["Postdocs", "Graduate Students", "Undergraduate Students", "Alumni"] as const;

function ProfileLinks({
  links,
  centered = false
}: {
  links?: {
    label: string;
    href: string;
  }[];
  centered?: boolean;
}) {
  if (!links?.length) {
    return null;
  }

  return (
    <div className={`mt-2 flex flex-wrap gap-x-4 gap-y-2 ${centered ? "justify-center" : ""}`}>
      {links.slice(0, 4).map((link) => {
        const isInternal = link.href.startsWith("/");

        return isInternal ? (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-semibold text-fudan transition hover:text-ink"
          >
            {link.label}
          </Link>
        ) : (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-semibold text-fudan transition hover:text-ink"
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}

function EmailLine({ email, centered = false }: { email?: string; centered?: boolean }) {
  if (!email) {
    return null;
  }

  return (
    <p className={`mt-3 text-sm ${centered ? "text-center" : ""}`}>
      <a href={`mailto:${email}`} className="font-semibold text-fudan transition hover:text-ink">
        {email}
      </a>
    </p>
  );
}

export default function MembersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Team"
        title="People in the lab"
        description="We aim to build a diverse group of researchers working across mass spectrometry, metabolomics/exposomics, computation, and biochemistry."
      />

      <section className="mx-auto max-w-7xl px-5 pb-12 pt-8 sm:px-8 lg:pb-16 lg:pt-10">
        <div className="grid gap-12">
          {members
            .filter((member) => member.group === "Principal Investigator")
            .map((member) => (
              <section key={member.name}>
                <h2 className="text-2xl font-semibold tracking-normal text-ink">Principal Investigator</h2>
                <article className="mt-5 flex flex-col items-center text-center">
                  <PersonAvatar name={member.name} image={member.image} size="xl" />
                  <div className="mt-5">
                    <h3 className="text-3xl font-semibold tracking-normal text-ink">
                      {member.name}
                      {member.chineseName ? (
                        <span lang="zh-Hans" className="font-cjk ml-3 text-xl font-normal text-muted">
                          {member.chineseName}
                        </span>
                      ) : null}
                    </h3>
                    {member.bio ? (
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">{member.bio}</p>
                    ) : null}
                    <EmailLine email={member.email} centered />
                    <ProfileLinks links={member.links} centered />
                  </div>
                </article>
              </section>
            ))}

          {groups.map((group) => {
            const groupMembers = members.filter((member) => member.group === group);

            if (groupMembers.length === 0) {
              return null;
            }

            return (
              <section key={group}>
                <h2 className="text-2xl font-semibold tracking-normal text-ink">{group}</h2>
                <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {groupMembers.map((member, index) => (
                    <article
                      key={`${member.group}-${member.name}-${index}`}
                      className="flex min-h-72 flex-col rounded-lg border border-line bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <PersonAvatar name={member.name} image={member.image} />
                        <div>
                          <h3 className="text-lg font-semibold text-ink">
                            {member.name}
                            {member.chineseName ? (
                              <span lang="zh-Hans" className="font-cjk ml-2 text-base font-normal text-muted">
                                {member.chineseName}
                              </span>
                            ) : null}
                          </h3>
                          <p className="mt-1 text-sm text-muted">{member.role}</p>
                        </div>
                      </div>
                      <p className="mt-5 flex-1 text-sm leading-7 text-muted">{member.bio}</p>
                      <EmailLine email={member.email} />
                      <ProfileLinks links={member.links} />
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </>
  );
}
