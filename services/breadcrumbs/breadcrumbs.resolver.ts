import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { interpolate } from './interpolate.service';
import { BreadCrumb } from './breadcrumb.interface';

@Injectable()
export class BreadcrumbsResolver implements Resolve<BreadCrumb>{

    /**
     *
     * @param route
     * @param data
     */
    resolve (route: ActivatedRouteSnapshot, data: any): Observable<BreadCrumb> {
        const text = this.buildName(data.breadcrumbs, route.data);
        const path = this.getPath(route.pathFromRoot);

        return of({text: text, path: path})
    }

    /**
     *
     * @param pathFromRoot
     */
    public getPath(pathFromRoot: Array<ActivatedRouteSnapshot>) {
        const segments = pathFromRoot.map((snapshot: ActivatedRouteSnapshot) => {
            return '/' + snapshot.url.map((segment: UrlSegment) => segment.path).join('/')
        });

        return segments.filter(s => s.length).join('/')
    }

    /**
     *
     * @param tpl
     * @param obj
     */
    public buildName(tpl, obj) {
        return interpolate(tpl, obj)
    }

}