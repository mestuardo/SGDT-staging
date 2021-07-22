/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable class-methods-use-this */
import {
  Document,
  HeadingLevel,
  Paragraph,
  TabStopPosition,
  TabStopType,
  TextRun,
} from 'docx';

import { GetProfessionalType } from '../../types/get-professional-types';

export default class DocumentCreator {
  public create(professionalInfo: GetProfessionalType): Document {
    const document: Document = new Document({
      sections: [
        {
          children: [
            this.createName(professionalInfo.name, professionalInfo.firstSurname),
            this.createHeading('Perfil'),
            this.createProfile(professionalInfo.profile),
            this.createHeading('Conocimientos y Skills Técnicos'),
            this.createSubHeading('Conocimientos Técnicos'),
            this.createTechnical(professionalInfo.technicalKnowledge),
            this.createSubHeading('Skills Técnicos'),
            ...this.createSkillsList(professionalInfo.skills),
            this.createHeading('Experiencia Laboral'),
            ...professionalInfo.pastJobs
              .map((position) => {
                const arr: Paragraph[] = [];

                arr.push(
                  this.createInstitutionHeader(
                    position.companyName,
                    position.period,
                  ),
                );
                arr.push(this.createPositionText(position.position, position.functions));

                const bulletPoints = this.splitParagraphIntoBullets(
                  position.technologiesUsed,
                );

                bulletPoints.forEach((bulletPoint) => {
                  arr.push(this.createBullet(bulletPoint));
                });

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            this.createHeading('Educación'),
            ...professionalInfo.education
              .map((education) => {
                const arr: Paragraph[] = [];
                arr.push(
                  this.createInstitutionHeader(
                    education.title,
                    `${education.period}`,
                  ),
                );
                arr.push(
                  this.createRoleText(
                    `${education.description}`,
                  ),
                );

                return arr;
              })
              .reduce((prev, curr) => prev.concat(curr), []),
          ],
        },
      ],
      styles: {
        default: {
          heading1: {
            run: {
              size: 28,
              bold: true,
              color: '0a521b',
              font: 'Verdana',
            },
          },
          heading2: {
            run: {
              size: 24,
              bold: true,
              color: '0a521b',
              font: 'Verdana',
            },
          },
        },
      },
    });

    return document;
  }

  public createProfile(profile: string): Paragraph {
    if (profile === null) {
      return new Paragraph('');
    }
    return new Paragraph({
      children: [
        new TextRun({
          text: `${profile}`,
          font: 'Verdana',
        }),
      ],
    });
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    });
  }

  public createName(name: string, lastName: string): Paragraph {
    // return new Paragraph({
    //   text,
    //   heading: HeadingLevel.TITLE,
    //   thematicBreak: true,
    // });
    return new Paragraph({
      heading: HeadingLevel.TITLE,
      children: [
        new TextRun({
          text: `${name} ${lastName}`,
          font: 'Verdana',
        }),
      ],
    });
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text,
      heading: HeadingLevel.HEADING_2,
    });
  }

  public createInstitutionHeader(
    institutionName: string,
    dateText: string,
  ): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
          font: 'Verdana',
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
          font: 'Verdana',
        }),
      ],
    });
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
          font: 'Verdana',
        }),
      ],
    });
  }

  public createPositionText(position: string, functions: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: `${position} - ${functions}`,
          italics: true,
          font: 'Verdana',
        }),
      ],
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: `${text}`,
          font: 'Verdana',
        }),
      ],
      // text,
      bullet: {
        level: 0,
      },
    });
  }

  public createSkillsList(skills: { title: string, body: string }[]): Paragraph[] {
    return skills.map(
      (skill) => new Paragraph({
        children: [
          new TextRun({
            text: `${skill.title} - ${skill.body}`,
            font: 'Verdana',
          }),
        ],
        bullet: {
          level: 0,
        },
      }),
    );
  }

  public createTechnical(skills: string): Paragraph {
    if (skills === null || skills === '') {
      return new Paragraph('');
    }
    return new Paragraph({
      children: [
        new TextRun({
          text: `${skills}`,
          font: 'Verdana',
        }),
      ],
    });
  }

  public splitParagraphIntoBullets(text: string): string[] {
    return text.split('\n\n');
  }

  public getMonthFromInt(value: number): string {
    switch (value) {
      case 1:
        return 'Ene';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Abr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Ago';
      case 9:
        return 'Sept';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dic';
      default:
        return 'N/A';
    }
  }
}
