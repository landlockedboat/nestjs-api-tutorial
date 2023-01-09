import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
    constructor(private prisma: PrismaService) { }

    async createBookmark(userId: number, dto: CreateBookmarkDto) {
        const bookmark = await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto
            }
        })

        return bookmark;
    }

    getBookmarks(userId: number) {
        return this.prisma.bookmark.findMany({ where: { userId } })
    }

    getBookmarkById(userId: number, bookmarkId: number) {
        return this.prisma.bookmark.findFirst(
            {
                where:
                    { userId, id: bookmarkId }
            })
    }

    async editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
        const bookmark = this.getBookmarkById(userId, bookmarkId);

        if (!bookmark) {
            throw new ForbiddenException("Access to resource denied")
        }

        return this.prisma.bookmark.update(
            {
                where: { id: bookmarkId },
                data: { ...dto }
            })

    }

    deleteBookmarkById(userId: number, bookmarkId: number) {
        const bookmark = this.getBookmarkById(userId, bookmarkId);

        if (!bookmark) {
            throw new ForbiddenException("Access to resource denied")
        }

        return this.prisma.bookmark.delete({ where: { id: bookmarkId } })
    }
}
