import { LinkType } from './linkType.enum';
import { Status } from './status.enum';
import { User } from './user.model';

export interface Core {
  added: Date;
  baseURL: string;
  domainRating?: number;
  exampleURL: string;
  id: number;
  isWarmed?: boolean;
  linkType?: LinkType;
  login?: string;
  password?: string;
  registerNeeded?: boolean;
  status: Status;
  traffic?: number;
  updated: Date;
  comments: any[];
  lastCommentUpdate?: Date;
  comment?: string;
  addedBy?: User;
}
