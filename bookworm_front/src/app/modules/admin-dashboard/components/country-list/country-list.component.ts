import { Component, OnInit } from '@angular/core';
import { CheckoutFormService } from '../../../../shared/services/checkout-form.service';
import { Country } from '../../../../core/models/country';
import { DialogService } from 'primeng/dynamicdialog';
import { AssignStateDialogComponent } from '../assign-state-dialog/assign-state-dialog.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { State } from '../../../../core/models/state';
import { ConfirmationService } from 'primeng/api';
import { CountryDialogComponent } from '../country-dialog/country-dialog.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  selectedCountry: Country;
  loading: boolean = false;
  showPopup: boolean = false;

  items = [
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: (event: any) => {
        this.openEditCountryDialog(event.item.data);
      },
      data: null,
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: (event: any) => {
        this.deleteCountry(event);
      },
      data: null,
    },
    {
      label: 'Add new state',
      icon: 'pi pi-fw pi-plus',
      command: (event: any) => {
        this.openAssignDialog(event.item.data);
      },
      data: null,
    },
  ];

  constructor(
    private checkoutFormService: CheckoutFormService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.listCountries();
  }

  private openAssignDialog(country: Country): void {
    const ref = this.dialogService.open(AssignStateDialogComponent, {
      header: 'Assign new state to a country',
      width: '30%',
      data: {
        country: country,
      },
    });
    ref.onClose.subscribe((resp: State) => {
      if (resp) {
        country.states.push(resp);
      }
    });
  }

  private listCountries() {
    this.checkoutFormService.getCountries().subscribe(data => {
      this.countries = data.map(data => {
        data.states.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        return data;
      });
    });
  }

  toggleMenu(menu: any, event: any, country: any) {
    this.items.forEach(item => {
      item.data = country;
    });
    menu.toggle(event);
  }

  private openEditCountryDialog(country: Country): void {
    const ref = this.dialogService.open(CountryDialogComponent, {
      header: 'Edit country',
      width: '30%',
      data: {
        country: country,
      },
    });

    ref.onClose.subscribe(country => {
      const countryIdx = this.countries.findIndex(x => x.id === country.id);
      if (countryIdx === -1) {
        this.countries.push(country);
      } else {
        this.countries[countryIdx] = country;
      }
    });
  }

  private deleteCountry(event: any): void {
    const countryToDelete = event.item.data as Country;
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this country?',
      accept: () => {
        this.checkoutFormService.deleteCountry(countryToDelete.id).subscribe({
          next: () => {
            this.toastService.showSuccessMessage(
              'Successfully removed country'
            );
            this.countries = this.countries.filter(
              x => x.id !== countryToDelete.id
            );
          },
          error: err => {
            this.toastService.showErrorMessage(err.message);
          },
        });
      },
    });
  }

  deleteState(event: any, stateId: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'Are you sure you want to delete this state?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.checkoutFormService.deleteState(stateId).subscribe({
          next: () => {
            this.toastService.showSuccessMessage('Successfully removed state');
            this.countries.forEach(country => {
              country.states = country.states.filter(
                state => state.id !== stateId
              );
            });
          },
          error: err => {
            console.log('err', err);
            this.toastService.showErrorMessage('Error while removing state');
          },
        });
      },
    });
  }

  openNewCountry() {
    const ref = this.dialogService.open(CountryDialogComponent, {
      header: 'Add new country',
      width: '30%',
    });

    ref.onClose.subscribe((country: Country) => {
      this.countries.push(country);
    });
  }
}
