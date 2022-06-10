import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ResearchFilter } from 'src/app/shared/models/research-filter.model';
import { CoreDialogComponent } from '../../component/core-dialog/core-dialog.component';
import { ResearchService } from '../../services/research.service';

@UntilDestroy()
@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.scss'],
})
export class ResearchComponent implements OnInit {
  linkControl = new FormControl('');

  showInfo = false;
  showTool = false;
  coreCount = 0;
  blockedCount = 0;
  neededLink!: string;
  links!: string[];

  constructor(private research: ResearchService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  findLinks() {
    const links: string[] = this.linkControl.value.split(/\r?\n/);
    const formatLinks = links.map((link) => {
      const linkData = link.split('/');
      return linkData[2];
    });
    this.research
      .findGoodLink(formatLinks)
      .pipe(untilDestroyed(this))
      .subscribe((res: ResearchFilter) => {
        this.showInfo = true;
        this.coreCount = res.core;
        this.blockedCount = res.blocked;
        this.links = res.links;
        this.findOneLink();
      });
  }

  findOneLink() {
    const links: string[] = this.linkControl.value.split(/\r?\n/);
    if (this.links.length) {
      this.showTool = true;
      this.neededLink = links.filter((link) => link.includes(this.links[0]))[0];
    } else {
      this.showTool = false;
    }
  }

  blockLink() {
    const baseURL = this.links[0];
    this.research
      .blockLink(baseURL)
      .pipe(untilDestroyed(this))
      .subscribe((res) => {
        this.blockedCount++;
        this.links.shift();
        this.findOneLink();
        console.log(res);
      });
  }

  coreLink() {
    const linkData = this.neededLink.split('/');
    const baseURL = linkData[2];
    const dialogRef = this.dialog.open(CoreDialogComponent, {
      data: {
        baseURL: baseURL,
        exampleURL: this.neededLink,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.research
          .coreLink(result)
          .pipe(untilDestroyed(this))
          .subscribe((res) => {
            this.coreCount++;
            this.links.shift();
            this.findOneLink();
          });
      }
    });
  }
}
