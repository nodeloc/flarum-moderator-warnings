import app from 'flarum/app';
import adminPage from './adminPage';

app.initializers.add('askvortsov/flarum-moderator-warnings', () => {
  app.extensionData
    .for('askvortsov-moderator-warnings')
    .registerPage(adminPage)
    .registerPermission(
      {
        icon: 'fas fa-images',
        label: app.translator.trans('askvortsov-moderator-warnings.admin.permissions.view_warnings'),
        permission: 'user.viewWarnings',
      },
      'moderate',
      3
    )
    .registerPermission(
      {
        icon: 'fas fa-edit',
        label: app.translator.trans('askvortsov-moderator-warnings.admin.permissions.manage_warnings'),
        permission: 'user.manageWarnings',
      },
      'moderate',
      3
    )
    .registerPermission(
      {
        icon: 'fas fa-times',
        label: app.translator.trans('askvortsov-moderator-warnings.admin.permissions.delete_warnings'),
        permission: 'user.deleteWarnings',
      },
      'moderate',
      3
    );
});
