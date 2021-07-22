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
            new Paragraph({
              text: `${professionalInfo.name} ${professionalInfo.firstSurname}`,
              heading: HeadingLevel.TITLE,
            }),
            this.createHeading('Perfil'),
            this.createProfile(professionalInfo.profile),
            this.createHeading('Conocimientos y Skills Técnicos'),
            this.createSubHeading('Conocimientos Técnicos'),
            this.createTechnical(professionalInfo.technicalKnowledge),
            this.createSubHeading('Skills Técnicos'),
            ...this.createSkillsList(professionalInfo.skills),
            // agregarle los demás campos (debe tener title y body)
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
    });

    return document;
  }

  public createProfile(profile: string): Paragraph {
    if (profile === null) {
      return new Paragraph('');
    }
    return new Paragraph(`${profile}`);
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
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
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
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
        }),
      ],
    });
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text,
      bullet: {
        level: 0,
      },
    });
  }

  public createSkillsList(skills: { title: string, body: string }[]): Paragraph[] {
    return skills.map(
      (skill) => new Paragraph({
        text: `${skill.title} - ${skill.body}`,
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
      children: [new TextRun(skills)],
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
