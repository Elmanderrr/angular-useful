import { Injectable, Injector } from '@angular/core';
import { filter, mergeMap, toArray } from 'rxjs/operators';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { concat, Observable, of } from 'rxjs';
import { BreadcrumbsResolver } from './breadcrumbs.resolver';
import { BreadCrumb } from './breadcrumb.interface';


@Injectable({
    providedIn: 'root'
})
export class BreadcrumbsService {

    constructor(private router: Router,
                private injector: Injector,
                private resolver: BreadcrumbsResolver) {}

    public breadcrumbs: Array<BreadCrumb> = [];

    public init() {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(e => {
                this.generateCrumbs(this.router.routerState.snapshot.root)
                    .pipe(
                        filter((breadcrumb:any) => breadcrumb),
                        toArray(),
                    )
                    .subscribe(resp => {
                        this.breadcrumbs = resp;
                    })
            })

    }

    /**
     * 
     * @param route
     */
    private generateCrumbs(route: ActivatedRouteSnapshot): Observable<BreadCrumb> {
        let crumbs$: Observable<BreadCrumb> = of(null);
        const data = route.routeConfig && route.routeConfig.data;

        if (data && data.breadcrumbs) {
            const resolver = this.getBreadcrumbResolver(data.breadcrumbs);

            crumbs$ = resolver.resolve(route, data);
        }

        return route.firstChild ? concat(crumbs$, this.generateCrumbs(route.firstChild)) : crumbs$;
    }

    /**
     *
     * @param resolver
     */
    private getBreadcrumbResolver(resolver) {
        return resolver.prototype instanceof BreadcrumbsResolver ? this.injector.get(resolver) : this.resolver;
    }
}
